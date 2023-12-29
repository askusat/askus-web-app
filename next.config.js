/** @type {import('next').NextConfig} */

// const withSerwist = require("@serwist/next").default({
//   swSrc: "app/sw.ts",
//   swDest: "public/sw.js",
// });

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  workboxOptions:{
    disableDevLogs: true,
  },
});

// import withSerwist from "@serwist/next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tmmuyitamylbpzfvhswn.supabase.co',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
}

// module.exports = nextConfig

// module.exports = withSerwist(nextConfig);
module.exports = withPWA(nextConfig);
