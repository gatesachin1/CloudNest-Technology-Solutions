// Runs after `next build` (static export → /out).
// 1. Copies each blog post from /blog/<slug>/index.html to /blog/<slug>.html,
//    the original (canonical) URL, so existing links and rankings keep working.
// 2. Writes small fallback pages for the old .html URLs. Production returns real
//    301s (CloudFront Function or S3 routing rules); these only matter on hosts
//    without redirect support.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");
if (!fs.existsSync(out)) {
  console.error("postbuild: /out not found. Did `next build` run with output: 'export'?");
  process.exit(1);
}

const blogDir = path.join(out, "blog");
let copied = 0;
for (const entry of fs.readdirSync(blogDir, { withFileTypes: true })) {
  const index = path.join(blogDir, entry.name, "index.html");
  if (entry.isDirectory() && fs.existsSync(index)) {
    fs.copyFileSync(index, path.join(blogDir, `${entry.name}.html`));
    copied++;
  }
}

// 3. Next 16 writes per-segment prefetch payloads as nested folders
//    (contact/__next.contact/__PAGE__.txt) but the client requests the dot-joined
//    name (contact/__next.contact.__PAGE__.txt). Write flat copies so static
//    hosts (S3, Amplify) serve them instead of returning 404.
let flattened = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else {
      const parts = path.relative(out, full).split(path.sep);
      const i = parts.findIndex((p, idx) => p.startsWith("__next.") && idx < parts.length - 1);
      if (i === -1) continue;
      const flat = path.join(out, ...parts.slice(0, i), parts.slice(i).join("."));
      if (!fs.existsSync(flat)) {
        fs.copyFileSync(full, flat);
        flattened++;
      }
    }
  }
}
walk(out);

const legacy = { "about.html": "/about/", "services.html": "/services/", "contact.html": "/contact/" };
for (const [file, target] of Object.entries(legacy)) {
  fs.writeFileSync(
    path.join(out, file),
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Redirecting…</title>` +
      `<link rel="canonical" href="${target}"><meta name="robots" content="noindex">` +
      `<meta http-equiv="refresh" content="0; url=${target}"></head>` +
      `<body><a href="${target}">This page has moved to ${target}</a></body></html>`,
  );
}

console.log(
  `postbuild: ${copied} blog post(s) copied to .html URLs, ${flattened} prefetch payload(s) flattened, ` +
    `${Object.keys(legacy).length} legacy fallbacks written.`,
);
