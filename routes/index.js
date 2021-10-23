const adminController = require("../components/User/userController");
const loginController = require("../components/Login/loginController");
const teacherController = require("../components/Teacher/teacherController");
const studentController = require("../components/Student/studentController");
const juegosController = require("../components/Juegos/juegosController");

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
        req.session.miId = { id: req.session.user.id };
        res.redirect("/juegos");
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
  app.use("/juegos", login, juegosController);
};

module.exports = routes;
