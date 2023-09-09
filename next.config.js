/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "34.27.165.161",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
    ],
  },

  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://34.27.165.161/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
