const adminController = require("../components/User/userController");
const loginController = require("../components/Login/loginController");

const login = require("../middleware/login");

const routes = (app) => {
  app.get("/", (req, res) => {
    res.render("publicPage");
  });
  app.use("/login", loginController);
  app.get("/home", login, (req, res) => {
    if (req.session.user.type === "admin") {
      res.render("gestor-docentes", { name: req.session.user.name });
    }
    if (req.session.user.type === "teacher") {
      res.render("gestor-alumnos");
    }

    if (req.session.user.type === "student") {
      res.render("home");
    }
  });
  app.use("/logout", login, (req, res) => {
    req.session.user = null;
    res.redirect("login");
  });
  app.use("/admin", adminController);
};

module.exports = routes;
