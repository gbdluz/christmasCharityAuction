/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos", // todo: to remove after test
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
