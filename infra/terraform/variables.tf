variable "aws_region" {
  description = "Region for the site bucket, contact Lambda, API, DynamoDB and SES."
  type        = string
  default     = "ap-south-1"
}

variable "domain_name" {
  description = "Apex domain. www.<domain> redirects to it."
  type        = string
  default     = "cloudnesttechnologysolutions.in"
}

variable "site_bucket_name" {
  description = "New PRIVATE bucket for the site (served only through CloudFront). Separate from the old public website bucket so you can switch over safely."
  type        = string
  default     = "cloudnesttechnologysolutions-site"
}

variable "route53_zone_id" {
  description = "Route 53 hosted zone ID for the domain. Leave empty if DNS is hosted elsewhere; the required records are then printed as outputs."
  type        = string
  default     = ""
}

variable "contact_to_email" {
  description = "Where contact-form enquiries are delivered (comma-separated allowed)."
  type        = string
  default     = "hello@cloudnesttechnologysolutions.in"
}

variable "contact_from_email" {
  description = "Sender address. Must be on the SES-verified domain."
  type        = string
  default     = "no-reply@cloudnesttechnologysolutions.in"
}

variable "rate_limit_max" {
  description = "Max contact submissions per IP per window."
  type        = number
  default     = 5
}

variable "rate_limit_window_seconds" {
  description = "Rate-limit window length."
  type        = number
  default     = 3600
}

variable "rate_limit_salt" {
  description = "Secret used to hash IPs. Set in terraform.tfvars (git-ignored) or TF_VAR_rate_limit_salt."
  type        = string
  sensitive   = true
}

variable "api_throttle_rate" {
  description = "API Gateway steady-state requests per second for the contact endpoint (all clients combined)."
  type        = number
  default     = 2
}

variable "api_throttle_burst" {
  description = "API Gateway burst limit for the contact endpoint."
  type        = number
  default     = 10
}
