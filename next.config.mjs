/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Handling .mp4 files for both client and server
      config.module.rules.push({
        test: /\.(mp4)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      });
  
      return config;
    },
  };

export default nextConfig;
