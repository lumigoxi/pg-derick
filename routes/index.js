const adminController = require("../components/Admin/AdminController");
const loginController = require("../components/Login/LoginController");
const routes = (app) => {
  app.get("/", (req, res) => {
    res.render("publicPage");
  });
  app.get("/home", (req, res) => {
    res.render("home");
  });
  app.use("/login", loginController);
  app.use("/admin", adminController);
  app.use("/login", () => {});
};

module.exports = routes;
