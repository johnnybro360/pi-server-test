// ecosystem.config.cjs
module.exports = {
    apps: [
      {
        name: "api",
        script: "./server/dist/index.js",
        cwd: "/home/jon/dev/projects/pi-server-test",
        node_args: "--max-old-space-size=256",
        max_memory_restart: "300M",

        env: {
          NODE_ENV: "production",
          API_PORT: 3001,
          DB_FILE_NAME: "/home/jon/dev/projects/pi-server-test/db.sqlite",
        },
      },
    ],
  };