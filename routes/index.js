const adminController = require("../components/User/userController");
const loginController = require("../components/Login/loginController");
const teacherController = require("../components/Teacher/teacherController");

const login = require("../middleware/login");

const routes = (app) => {
  app.get("/", (req, res) => {
    res.render("publicPage");
  });
  app.use("/login", loginController);
  app.get("/home", login, (req, res) => {
    switch (req.session.user.type) {
      case "admin":
        res.redirect("/gestor-docentes");
        break;
      case "teach":
        res.render("gestor-alumnos");
        break;

      default:
        res.render("home");
        break;
    }
  });
  app.use("/logout", login, (req, res) => {
    req.session.user = null;
    res.redirect("login");
  });
  app.use("/admin", adminController);
  app.use("/gestor-docentes", teacherController);
};

module.exports = routes;
