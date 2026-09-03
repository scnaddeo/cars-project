/** @type {import('next').NextConfig} */
const nextConfig = {
  // No longer statically exported: the admin panel and image routes need a
  // server (API routes, cookies, Netlify Blobs), so Netlify's Next.js
  // Runtime builds and deploys this as a standard SSR/serverless Next app.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
