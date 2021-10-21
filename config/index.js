require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  appPort: process.env.APP_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  SessionSecret: process.env.SESSION_SECRET,
};

module.exports = config;
