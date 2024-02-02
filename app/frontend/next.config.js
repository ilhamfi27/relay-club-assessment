const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  rewrites: async function () {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ];
  },
};

module.exports = nextConfig;
