output "site_bucket" {
  description = "Upload the /out folder here (see scripts/deploy.sh)."
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "Used for cache invalidation after each deploy."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain" {
  description = "Test the site here before switching DNS. Point apex + www to it (ALIAS/CNAME) if DNS isn't on Route 53."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "contact_endpoint" {
  description = "Set NEXT_PUBLIC_CONTACT_ENDPOINT to this value, then rebuild the site."
  value       = "${aws_apigatewayv2_api.contact.api_endpoint}/contact"
}

output "acm_validation_records" {
  description = "Add these CNAMEs at your DNS provider if not using Route 53."
  value = [for o in aws_acm_certificate.site.domain_validation_options : {
    name  = o.resource_record_name
    type  = o.resource_record_type
    value = o.resource_record_value
  }]
}

output "ses_dkim_records" {
  description = "Add these CNAMEs at your DNS provider if not using Route 53 (verifies the domain in SES)."
  value = [for t in aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens : {
    name  = "${t}._domainkey.${var.domain_name}"
    type  = "CNAME"
    value = "${t}.dkim.amazonses.com"
  }]
}
