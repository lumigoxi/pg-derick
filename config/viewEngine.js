const handlebars = require("express-handlebars");

const viewEngine = (app) => {
  app.set("views", __dirname + "/../views");
  app.engine(
    "hbs",
    handlebars({
      defaultLayout: "",
      layoutsDir: __dirname + "/../views",
      extname: ".hbs",
    })
  );
  app.set("view engine", "hbs");
};

module.exports = viewEngine;
