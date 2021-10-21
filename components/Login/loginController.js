const { Router } = require("express");
const { verificarCredenciales } = require("../User/userService");

const ruta = Router();

ruta.get("/", async (req, res) => {
  res.render("login");
});

ruta.post("/", async (req, res) => {
  if (!req.body.user && !req.body.password) {
    res.render("/login", { error: "Campos incompletos" });
  }

  try {
    const user = await verificarCredenciales(req);
    req.session.user = { name: user.name, type: user.type };
    res.redirect("/home");
  } catch (error) {
    res.render("login", { error: error.message });
  }
});

module.exports = ruta;
