const adminController = require("../components/User/userController");
const loginController = require("../components/Login/loginController");
const teacherController = require("../components/Teacher/teacherController");
const studentController = require("../components/Student/studentController");

const login = require("../middleware/login");

const routes = (app) => {
  app.get("/", (req, res) => {
    res.render("publicPage");
  });
  app.get("/historia", (req, res) => {
    res.render("historia");
  });
  app.use("/login", loginController);
  app.get("/home", login, (req, res) => {
    switch (req.session.user.type) {
      case "admin":
        res.redirect("/gestor-docentes");
        break;
      case "teacher":
        res.redirect("/gestor-alumnos");
        break;

      case "student":
        res.render("home");
        break;
    }
  });
  app.use("/logout", login, (req, res) => {
    req.session.user = null;
    res.redirect("login");
  });
  app.use("/admin", login, adminController);
  app.use("/gestor-docentes", login, teacherController);
  app.use("/gestor-alumnos", login, studentController);
};

module.exports = routes;
