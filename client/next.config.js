/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // URL: 'http://localhost:8000', 
        BACKENDURL: "dd",
        // URL: 'http://192.168.1.215:8000'
        URL: 'https://peach-4m9r.onrender.com',
        // URL: 'https://b145-2401-4900-1c43-9f9a-38f8-15a7-789c-b8a2.ngrok-free.app'
      },
      images: {
        remotePatterns:[
            {
                hostname: "localhost",
                // hostname: "192.168.1.215"
                hostname: "peach-4m9r"
                // hostname: "https://9855-103-47-153-161.ngrok-free.app"
                // hostname: "b145-2401-4900-1c43-9f9a-38f8-15a7-789c-b8a2.ngrok-free.app"
            }
        ],   
    },
}

module.exports = nextConfig

// to see your local ip for URL type this in terminal - ipconfig getifaddr en0
// for windows use ip-config