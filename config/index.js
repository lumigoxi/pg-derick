require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  appPort: 5000,
  dbUser: DeVasquez,
  dbPassword: coder502,
  dbHost: cluster0.64dhp.mongodb.net,
  dbName: PG,
  SessionSecret: secret,
};

module.exports = config;
