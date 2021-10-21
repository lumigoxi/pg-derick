const adminController = require("../components/Admin/adminController");
const loginController = require("../components/Login/loginController");

const login = require("../middleware/login");

const routes = (app) => {
  app.get("/", (req, res) => {
    res.render("publicPage");
  });
  app.get("/home", login, (req, res) => {
    if (req.session.user.type === "admin") {
      res.render("gestor-docentes");
    }
  });
  app.use("/login", loginController);
  app.use("/logout", login, (req, res) => {
    req.session.user = null;
    res.redirect("login");
  });
  app.use("/admin", adminController);
  app.use("/login", () => {});
};

module.exports = routes;
