output "root_website_url" {
  description = "S3 static website endpoint for cloudnesttechnologysolutions.in"
  value       = "http://${aws_s3_bucket_website_configuration.root.website_endpoint}"
}

output "www_website_url" {
  description = "S3 static website endpoint for www.cloudnesttechnologysolutions.in (redirects to root)"
  value       = "http://${aws_s3_bucket_website_configuration.www.website_endpoint}"
}

output "root_bucket_name" {
  description = "Root S3 bucket name"
  value       = aws_s3_bucket.root.id
}

output "www_bucket_name" {
  description = "WWW S3 bucket name"
  value       = aws_s3_bucket.www.id
}

output "root_bucket_arn" {
  description = "Root S3 bucket ARN"
  value       = aws_s3_bucket.root.arn
}
