/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Soporte para assets binarios del ramen shop
    config.module.rules.push({
      test: /\.(ktx2|gltf|glb|bin)$/,
      type: 'asset/resource'
    })
    return config
  },
  // Optimización para assets grandes
  experimental: {
    largePageDataBytes: 128 * 1000, // 128KB
  },
};

module.exports = nextConfig;