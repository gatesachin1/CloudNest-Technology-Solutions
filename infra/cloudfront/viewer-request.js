// CloudFront Function (runtime cloudfront-js-2.0), viewer-request event.
// Also executed by scripts/serve-static.mjs so `npm start` behaves like production.
//
// 1. www → apex (301)
// 2. Legacy URLs from the old static site → new clean URLs (301)
// 3. /blog/<slug> or /blog/<slug>/ → /blog/<slug>.html (301, the canonical post URL)
// 4. Extension-less paths get a trailing slash (301)
// 5. Directory paths are rewritten to their index.html (internal, no redirect)

var APEX_HOST = "cloudnesttechnologysolutions.in";

var REDIRECTS = {
  "/index.html": "/",
  "/about.html": "/about/",
  "/services.html": "/services/",
  "/contact.html": "/contact/",
  "/blog/index.html": "/blog/",
};

// Real files without an extension (Next.js OG images); served as-is.
var EXTENSIONLESS_FILES = { "/opengraph-image": true, "/twitter-image": true };

function qs(querystring) {
  var parts = [];
  for (var key in querystring) {
    var item = querystring[key];
    if (item.multiValue) {
      for (var i = 0; i < item.multiValue.length; i++) parts.push(key + "=" + item.multiValue[i].value);
    } else {
      parts.push(key + (item.value !== "" ? "=" + item.value : ""));
    }
  }
  return parts.length ? "?" + parts.join("&") : "";
}

function redirect(location) {
  return {
    statusCode: 301,
    statusDescription: "Moved Permanently",
    headers: { location: { value: location }, "cache-control": { value: "max-age=3600" } },
  };
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var host = request.headers.host ? request.headers.host.value : "";
  var query = qs(request.querystring || {});

  if (host.indexOf("www.") === 0) {
    return redirect("https://" + APEX_HOST + uri + query);
  }

  if (REDIRECTS[uri]) {
    return redirect(REDIRECTS[uri] + query);
  }

  var post = uri.match(/^\/blog\/([a-z0-9-]+)\/?$/);
  if (post) {
    return redirect("/blog/" + post[1] + ".html" + query);
  }

  var last = uri.split("/").pop();
  if (uri !== "/" && last !== "" && last.indexOf(".") === -1 && !EXTENSIONLESS_FILES[uri]) {
    return redirect(uri + "/" + query);
  }

  if (uri.charAt(uri.length - 1) === "/") {
    request.uri = uri + "index.html";
  }
  return request;
}
