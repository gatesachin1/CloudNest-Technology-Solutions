variable "aws_region" {
  description = "AWS region to deploy the S3 bucket into"
  type        = string
  default     = "us-east-1" 
}

variable "bucket_name" {
  description = "S3 bucket name (must be globally unique across all AWS accounts)"
  type        = string
  default     = "cloudnest-technology-solutions"
}
