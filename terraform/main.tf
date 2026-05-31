terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.3.0"
}

provider "aws" {
  region = var.aws_region
}


# ═══════════════════════════════════════════════════════════════════════════════
#  ROOT BUCKET — cloudnesttechnologysolutions.in
#  Hosts all website files with public read access
# ═══════════════════════════════════════════════════════════════════════════════

resource "aws_s3_bucket" "root" {
  bucket        = "cloudnesttechnologysolutions.in"
  force_destroy = true

  tags = {
    Project     = "CloudNest Technology Solutions"
    Environment = "production"
    ManagedBy   = "Terraform"
  }
}

resource "aws_s3_bucket_website_configuration" "root" {
  bucket = aws_s3_bucket.root.id

  index_document { suffix = "index.html" }
  error_document { key    = "index.html" }
}

resource "aws_s3_bucket_public_access_block" "root" {
  bucket = aws_s3_bucket.root.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "root" {
  bucket     = aws_s3_bucket.root.id
  depends_on = [aws_s3_bucket_public_access_block.root]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicRead"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "arn:aws:s3:::cloudnesttechnologysolutions.in/*"
      }
    ]
  })
}

# ── Upload website files to root bucket ──────────────────────────────────────

locals {
  html_files = {
    "index.html"                                    = "${path.module}/../index.html"
    "about.html"                                    = "${path.module}/../about.html"
    "services.html"                                 = "${path.module}/../services.html"
    "contact.html"                                  = "${path.module}/../contact.html"
    "blog/index.html"                               = "${path.module}/../blog/index.html"
    "blog/devops-best-practices-2025.html"          = "${path.module}/../blog/devops-best-practices-2025.html"
    "blog/aws-s3-static-website-hosting.html"       = "${path.module}/../blog/aws-s3-static-website-hosting.html"
    "blog/what-is-sre.html"                         = "${path.module}/../blog/what-is-sre.html"
  }
}

resource "aws_s3_object" "html_pages" {
  for_each     = local.html_files
  bucket       = aws_s3_bucket.root.id
  key          = each.key
  source       = each.value
  content_type = "text/html; charset=utf-8"
  etag         = filemd5(each.value)
}

resource "aws_s3_object" "css" {
  bucket       = aws_s3_bucket.root.id
  key          = "css/styles.css"
  source       = "${path.module}/../css/styles.css"
  content_type = "text/css; charset=utf-8"
  etag         = filemd5("${path.module}/../css/styles.css")
}

resource "aws_s3_object" "js" {
  bucket       = aws_s3_bucket.root.id
  key          = "js/main.js"
  source       = "${path.module}/../js/main.js"
  content_type = "application/javascript; charset=utf-8"
  etag         = filemd5("${path.module}/../js/main.js")
}

resource "aws_s3_object" "sitemap" {
  bucket       = aws_s3_bucket.root.id
  key          = "sitemap.xml"
  source       = "${path.module}/../sitemap.xml"
  content_type = "application/xml"
  etag         = filemd5("${path.module}/../sitemap.xml")
}


# ═══════════════════════════════════════════════════════════════════════════════
#  WWW BUCKET — www.cloudnesttechnologysolutions.in
#  Empty bucket that redirects all requests to the root domain
# ═══════════════════════════════════════════════════════════════════════════════

resource "aws_s3_bucket" "www" {
  bucket        = "www.cloudnesttechnologysolutions.in"
  force_destroy = true

  tags = {
    Project     = "CloudNest Technology Solutions"
    Environment = "production"
    ManagedBy   = "Terraform"
  }
}

resource "aws_s3_bucket_website_configuration" "www" {
  bucket = aws_s3_bucket.www.id

  redirect_all_requests_to {
    host_name = "cloudnesttechnologysolutions.in"
    protocol  = "http"
  }
}

resource "aws_s3_bucket_public_access_block" "www" {
  bucket = aws_s3_bucket.www.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
