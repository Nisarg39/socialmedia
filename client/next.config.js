/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // URL: 'http://localhost:8000',
        // URL: 'http://192.168.1.215:8000'
        URL: 'https://peach-4m9r.onrender.com'
      },
      images: {
        remotePatterns:[
            {
                // hostname: "localhost"
                // hostname: "192.168.1.215"
                hostname: "peach-4m9r"
            }
        ],
        headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
            { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ],
        
    }
}

module.exports = nextConfig

// to see your local ip for URL type this in terminal - ipconfig getifaddr en0
// for windows use ip-config