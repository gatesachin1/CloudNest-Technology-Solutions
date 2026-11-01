import type { NextConfig } from "next";

// Static export: `npm run build` writes a fully static site to /out,
// deployable to S3 + CloudFront or Amplify Hosting.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  // Inline the (small) Tailwind CSS into each page: removes a render-blocking request.
  experimental: { inlineCss: true },
};

export default nextConfig;
