const { dbHost, dbName, dbPassword, dbUser } = require("../config");
const db = require("mongoose");
const URL = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority
`;

const DB_CONNECT = async () => {
  try {
    await db.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB esta conectada");
  } catch (error) {
    console.log("[db] " + error);
  }
};

module.exports = DB_CONNECT;
