/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URL: 'http://localhost:8000',
        // URL: 'http://192.168.1.215:8000'
      },
      images: {
        remotePatterns:[
            {
                hostname: "localhost"
                // hostname: "192.168.1.215"
            }
        ]
        
    }
}

module.exports = nextConfig

// to see your local ip for URL type this in terminal - ipconfig getifaddr en0