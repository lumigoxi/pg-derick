const { Router } = require("express");

const userService = require("../User/userService");

const ruta = Router();

ruta.get("/", async (req, res) => {
  const recursos = await userService.buscarRecursos(req.session.miId.id);
  res.render("juegos", recursos);
});

module.exports = ruta;
