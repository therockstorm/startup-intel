const CSP = `
  base-uri 'none';
  default-src 'self';
  child-src example.com;
  font-src 'self';
  frame-ancestors 'none';
  object-src 'none';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' 'report-sample';
  style-src 'self' 'unsafe-inline' 'report-sample';
  upgrade-insecure-requests;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { scrollRestoration: true },
  headers() {
    return [
      {
        headers: [
          {
            key: "Access-Control-Allow-Methods",
            value: "POST, GET",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://startupintel.dev",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Permissions-Policy",
            value: "fullscreen=()",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: CSP.replace(/\s{2,}/g, " ").trim(),
          },
        ],
        source: "/(.*)",
      },
    ];
  },
  images: {
    remotePatterns: [
      { hostname: "bookface-images.s3.amazonaws.com", protocol: "https" },
    ],
  },
  reactStrictMode: true,
  rewrites() {
    return [
      {
        destination: "https://plausible.io/js/script.outbound-links.js",
        source: "/js/script.js",
      },
      {
        destination: "https://plausible.io/api/event",
        source: "/api/event",
      },
    ];
  },
};

export default nextConfig;
