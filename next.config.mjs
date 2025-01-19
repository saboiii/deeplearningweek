/** @type {import('next').NextConfig} */
const nextConfig = {
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
              "value": "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' ; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; object-src 'self' data:; base-uri 'self'; form-action 'self'; media-src 'self'; upgrade-insecure-requests; frame-ancestors 'none'; worker-src 'self'; connect-src 'self'"
            },
            {
              "key": "Access-Control-Allow-Origin",
              "value": "*"
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
  