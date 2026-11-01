#!/usr/bin/env bash
# Upload the built site to S3 with correct caching and content types, then
# invalidate CloudFront. Nothing here runs automatically. Run it yourself:
#
#   SITE_BUCKET=cloudnesttechnologysolutions-site CF_DISTRIBUTION_ID=E123... ./scripts/deploy.sh
#
# For the CURRENT S3-website setup (no CloudFront), omit CF_DISTRIBUTION_ID and
# set SITE_BUCKET=cloudnesttechnologysolutions.in.
set -euo pipefail

: "${SITE_BUCKET:?Set SITE_BUCKET}"
OUT=out

[ -d "$OUT" ] || { echo "No $OUT/ folder. Run: npm run build"; exit 1; }

# 1. Hashed assets: cache for a year.
aws s3 sync "$OUT/_next/static" "s3://$SITE_BUCKET/_next/static" \
  --cache-control "public, max-age=31536000, immutable" --delete

# 2. Everything else: always revalidate (HTML, sitemap, RSC payloads).
aws s3 sync "$OUT" "s3://$SITE_BUCKET" \
  --exclude "_next/static/*" --exclude "opengraph-image" --exclude "twitter-image" \
  --cache-control "public, max-age=0, must-revalidate" --delete

# 3. Extension-less OG images need an explicit content type.
for img in opengraph-image twitter-image; do
  aws s3 cp "$OUT/$img" "s3://$SITE_BUCKET/$img" \
    --content-type image/png --cache-control "public, max-age=86400"
done

if [ -n "${CF_DISTRIBUTION_ID:-}" ]; then
  aws cloudfront create-invalidation --distribution-id "$CF_DISTRIBUTION_ID" --paths "/*" >/dev/null
  echo "CloudFront invalidation started."
fi
echo "Deployed to s3://$SITE_BUCKET"
