# CloudNest Technology Solutions — Web Portal

Marketing and lead-generation website for CloudNest Technology Solutions, a cloud-first web development company based in Pune, India. Hosted on AWS S3 (private) behind CloudFront.

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styles | Vanilla CSS with custom properties |
| Scripts | Vanilla JavaScript (IIFE, no framework) |
| Fonts | Google Fonts — Inter + Poppins |
| Icons | Font Awesome 6.5 (CDN) |
| Hosting | AWS S3 (private) + CloudFront (HTTPS) |
| IaC | Terraform ≥ 1.3 |

## Project Structure

```
.
├── index.html          # HTML markup
├── css/
│   └── styles.css      # All styles — design system, components, responsive
├── js/
│   └── main.js         # Interactions — nav, counters, form, animations
├── terraform/
│   ├── main.tf         # S3 bucket, CloudFront distribution, bucket policy
│   ├── variables.tf    # aws_region, bucket_name
│   └── outputs.tf      # cloudfront_url, distribution_id, bucket info
└── README.md
```

## Prerequisites

- [Terraform ≥ 1.3](https://developer.hashicorp.com/terraform/install)
- [AWS CLI](https://aws.amazon.com/cli/) configured with credentials

```bash
aws configure
# Enter: Access Key ID, Secret Access Key, region (us-east-1), output (json)
```

## Deployment

```bash
cd terraform

# 1. Download AWS provider
terraform init

# 2. Preview changes
terraform plan

# 3. Deploy (CloudFront propagation takes ~5–10 min)
terraform apply
```

After `apply` completes, Terraform outputs the live URL:

```
cloudfront_url = "d2gfppyzwe9vs0.cloudfront.net"
```

The S3 bucket is **fully private** — only the CloudFront distribution can read objects. Direct S3 URLs return 403.

## Updating the Site

Edit any file locally, then re-apply:

```bash
terraform apply
```

Terraform detects file changes via `etag = filemd5(...)` and re-uploads only changed objects. To force CloudFront to serve fresh content immediately:

```bash
aws cloudfront create-invalidation \
  --distribution-id <cloudfront_distribution_id> \
  --paths "/*"
```

Replace `E32UNUK2VNAQI6` with the value from `terraform output cloudfront_distribution_id`.

## Teardown

```bash
terraform destroy
```

The bucket has `force_destroy = true`, so Terraform empties and deletes it automatically.

## Contact

**CloudNest Technology Solutions**
- Name: SACHIN S. GATE 
- Email: gatesachin1112@gmail.com
- Phone: +91 78752 55254
- Location: Pune, Maharashtra, India
