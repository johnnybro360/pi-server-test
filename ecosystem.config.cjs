// ecosystem.config.cjs
module.exports = {
    apps: [
      {
        name: "api",
        script: "./server/dist/index.js",
        cwd: "/home/pi/dev/projects/pi-server-test",
  
        env: {
          NODE_ENV: "production",
          API_PORT: 3001,
          DB_FILE_NAME: "/home/pi/dev/projects/pi-server-test/db.sqlite",
        },
      },
    ],
  };