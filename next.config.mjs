/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export const config = {
  runtime: "edge", // or 'nodejs'
}

export default nextConfig;
