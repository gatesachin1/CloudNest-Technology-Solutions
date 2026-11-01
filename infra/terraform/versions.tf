terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4"
    }
  }

  # Recommended: keep state in S3 instead of on your laptop. Create the bucket once, then uncomment.
  # backend "s3" {
  #   bucket       = "cloudnest-terraform-state"
  #   key          = "website/terraform.tfstate"
  #   region       = "ap-south-1"
  #   use_lockfile = true
  # }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Project   = "cloudnest-website"
      ManagedBy = "Terraform"
    }
  }
}

# CloudFront certificates must live in us-east-1.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
  default_tags {
    tags = {
      Project   = "cloudnest-website"
      ManagedBy = "Terraform"
    }
  }
}
