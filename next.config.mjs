/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        search: '',
      },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        "source": "/:path*",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "Content-Security-Policy",
            "value": "default-src 'self' https://challenges.cloudflare.com/; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://clerk.dlweek.com/ https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' https://img.clerk.com blob: data: https://www.googletagmanager.com/; font-src 'self'; object-src 'self' data:; base-uri 'self'; form-action 'self'; media-src 'self'; upgrade-insecure-requests; frame-ancestors 'none'; worker-src 'self' blob:; connect-src 'self' https://www.google-analytics.com https://clerk.dlweek.com/ https://raw.githubusercontent.com/"
          },
          {
            "key": "Access-Control-Allow-Origin",
            "value": "https://www.dlweek.com/"
          },
          {
            "key": "Access-Control-Allow-Methods",
            "value": "GET, POST, PUT, DELETE"
          },
          {
            "key": "Access-Control-Allow-Headers",
            "value": "Content-Type, Authorization"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          }
        ]
      }

    ];
  },
};

export default nextConfig;
