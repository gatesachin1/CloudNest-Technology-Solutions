# ═══════════════════════════════════════════════════════════════════
#  Contact form: API Gateway (HTTP API, throttled) → Lambda → SES
#  Per-IP rate limiting in DynamoDB (items expire via TTL).
#  Build the bundle first: npm run build:lambda
# ═══════════════════════════════════════════════════════════════════

locals {
  allowed_origins = [
    "https://${var.domain_name}",
    "https://www.${var.domain_name}",
  ]
}

data "archive_file" "contact" {
  type        = "zip"
  source_file = "${path.module}/../contact-lambda/dist/index.mjs"
  output_path = "${path.module}/.build/contact-lambda.zip"
}

resource "aws_dynamodb_table" "rate_limit" {
  name         = "cloudnest-contact-rate-limit"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"

  attribute {
    name = "pk"
    type = "S"
  }

  ttl {
    attribute_name = "expiresAt"
    enabled        = true
  }
}

# ─── SES: verify the domain (DKIM) so we can send from it ────────
resource "aws_sesv2_email_identity" "domain" {
  email_identity = var.domain_name
}

resource "aws_route53_record" "ses_dkim" {
  count   = local.use_route53 ? 3 : 0
  zone_id = var.route53_zone_id
  name    = "${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}._domainkey.${var.domain_name}"
  type    = "CNAME"
  ttl     = 600
  records = ["${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}.dkim.amazonses.com"]
}

# ─── Lambda ──────────────────────────────────────────────────────
resource "aws_cloudwatch_log_group" "contact" {
  name              = "/aws/lambda/cloudnest-contact"
  retention_in_days = 30
}

resource "aws_iam_role" "contact" {
  name = "cloudnest-contact-lambda"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "contact" {
  name = "least-privilege"
  role = aws_iam_role.contact.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["logs:CreateLogStream", "logs:PutLogEvents"]
        Resource = "${aws_cloudwatch_log_group.contact.arn}:*"
      },
      {
        Effect    = "Allow"
        Action    = "ses:SendEmail"
        Resource  = aws_sesv2_email_identity.domain.arn
        Condition = { StringEquals = { "ses:FromAddress" = var.contact_from_email } }
      },
      {
        Effect   = "Allow"
        Action   = "dynamodb:UpdateItem"
        Resource = aws_dynamodb_table.rate_limit.arn
      },
    ]
  })
}

resource "aws_lambda_function" "contact" {
  function_name    = "cloudnest-contact"
  role             = aws_iam_role.contact.arn
  runtime          = "nodejs22.x"
  architectures    = ["arm64"]
  handler          = "index.handler"
  filename         = data.archive_file.contact.output_path
  source_code_hash = data.archive_file.contact.output_base64sha256
  memory_size      = 256
  timeout          = 10

  environment {
    variables = {
      CONTACT_PROVIDER          = "ses"
      CONTACT_TO_EMAIL          = var.contact_to_email
      CONTACT_FROM_EMAIL        = var.contact_from_email
      CONTACT_ALLOWED_ORIGINS   = join(",", local.allowed_origins)
      RATE_LIMIT_TABLE          = aws_dynamodb_table.rate_limit.name
      RATE_LIMIT_MAX            = tostring(var.rate_limit_max)
      RATE_LIMIT_WINDOW_SECONDS = tostring(var.rate_limit_window_seconds)
      RATE_LIMIT_SALT           = var.rate_limit_salt
    }
  }

  depends_on = [aws_cloudwatch_log_group.contact, aws_iam_role_policy.contact]
}

# ─── API Gateway HTTP API ────────────────────────────────────────
# CORS is handled inside the Lambda (single source of truth), so it's not configured here.
resource "aws_apigatewayv2_api" "contact" {
  name          = "cloudnest-contact"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "contact" {
  api_id                 = aws_apigatewayv2_api.contact.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "contact" {
  for_each  = toset(["POST /contact", "OPTIONS /contact"])
  api_id    = aws_apigatewayv2_api.contact.id
  route_key = each.value
  target    = "integrations/${aws_apigatewayv2_integration.contact.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.contact.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_rate_limit  = var.api_throttle_rate
    throttling_burst_limit = var.api_throttle_burst
  }
}

resource "aws_lambda_permission" "api" {
  statement_id  = "AllowApiGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact.execution_arn}/*/*/contact"
}
