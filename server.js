const express = require("express");
const session = require("express-session");
const viewEngine = require("./config/viewEngine");
const cors = require("cors");
const routes = require("./routes");
const DB_CONNECT = require("./db");
const { SessionSecret, appPort } = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

DB_CONNECT();
routes(app);
app.use("/static", express.static("public"));
viewEngine(app);

app.use(cors());
app.use("/static", express.static("public"));

app.listen(appPort, () => {
  console.log(`APP funcionando en http://localhost:${appPort}`);
});
