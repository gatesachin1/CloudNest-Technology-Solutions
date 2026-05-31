# CloudNest Technology Solutions — Web Portal

Marketing and lead-generation website for Cloudnest Technology Solutions, a DevOps & cloud engineering company based in Pune, India. Hosted on AWS S3 static website hosting.

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styles | Vanilla CSS with custom properties |
| Scripts | Vanilla JavaScript (IIFE, no framework) |
| Fonts | Google Fonts — Inter + Poppins |
| Icons | Font Awesome 6.5 (CDN) |
| Hosting | AWS S3 static website hosting (public) |
| IaC | Terraform ≥ 1.3 |

## Project Structure

```
.
├── index.html                          # Home — hero, services, pricing, testimonials
├── about.html                          # About the company, values, expertise
├── services.html                       # DevOps, AWS, SRE, CI/CD, IaC, Web Dev
├── contact.html                        # Contact form (WhatsApp integration) + FAQ
├── sitemap.xml                         # All pages with priorities and change frequencies
├── css/
│   └── styles.css                      # Design system, components, responsive
├── js/
│   └── main.js                         # Nav, counters, form submission, animations
├── blog/
│   ├── index.html                      # Blog listing
│   ├── devops-best-practices-2025.html # DevOps guide for Indian SMBs
│   ├── aws-s3-static-website-hosting.html  # S3 hosting tutorial
│   └── what-is-sre.html                # SRE explainer
└── terraform/
    ├── main.tf                         # S3 buckets, static hosting, bucket policy, file uploads
    ├── variables.tf                    # aws_region
    └── outputs.tf                      # root_website_url, www_website_url, bucket info
```

## S3 Buckets

| Bucket | Purpose |
|---|---|
| `cloudnesttechnologysolutions.in` | Hosts all website files — static website hosting enabled, public read |
| `www.cloudnesttechnologysolutions.in` | Redirect-only — all requests redirect to root domain |

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

# 3. Deploy
terraform apply
```

After `apply` completes, Terraform outputs the live URLs:

```
root_website_url = "http://cloudnesttechnologysolutions.in.s3-website-us-east-1.amazonaws.com"
www_website_url  = "http://www.cloudnesttechnologysolutions.in.s3-website-us-east-1.amazonaws.com"
```

## Updating the Site

Edit any file locally, then re-apply:

```bash
terraform apply
```

Terraform detects file changes via `etag = filemd5(...)` and re-uploads only changed objects.

## Adding a New Page

1. Create the HTML file (root level or inside `blog/`)
2. Add it to the `html_files` local in `terraform/main.tf`
3. Add the URL to `sitemap.xml`
4. Run `terraform apply`

## Teardown

```bash
terraform destroy
```

The buckets have `force_destroy = true`, so Terraform empties and deletes them automatically.

## SEO

Each page includes:
- Unique `<title>` and `<meta name="description">`
- `<link rel="canonical">`
- `<meta name="robots" content="index, follow">`
- Open Graph tags (`og:title`, `og:description`, `og:url`)
- JSON-LD structured data (Organization, WebSite, BlogPosting)
- Listed in `sitemap.xml`

## Contact

**Cloudnest Technology Solutions**
- Name: Sachin S. Gate
- Email: gatesachin1112@gmail.com
- Phone: +91 78752 55254
- Location: Pune, Maharashtra, India
