const { Router } = require("express");

const userService = require("../User/userService");

const ruta = Router();

ruta.get("/", async (req, res) => {
  let myAction = {};
  if (req.session.action) {
    myAction = req.session.action;
    req.session.action = null;
  }
  try {
    const teachers = await userService.obtenerInfo({ type: "teacher" }, [
      "name",
      "other",
    ]);
    const data = [];
    teachers.forEach((element) => {
      data.push({ name: element.name, other: element.other, id: element._id });
    });
    res.render("gestor-docentes", {
      teachers: data,
      action: myAction,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error inesperado",
      mensaje: err.message,
      datos: null,
    });
  }
});

ruta.get("/editar/:id", async (req, res) => {
  try {
    const teacher = await userService.obtenerInfo({ _id: req.params.id });
    const data = {
      name: teacher[0].name,
      email: teacher[0].email,
      password: teacher[0].password,
      other: teacher[0].other,
      id: teacher[0]._id,
    };
    res.render("editar-docente", { teacher: data, name: data.name });
  } catch (err) {
    res.status(500).json({
      error: "Error inesperado",
      mensaje: err.message,
      datos: null,
    });
  }
});

ruta.post("/editar/:id", async (req, res) => {
  try {
    const admin = await userService.actualizarPorId(req.params.id, req.body);
    if (admin.name) {
      req.session.action = { edit: "true", name: admin.name };
    }
    res.redirect("/gestor-docentes");
  } catch (err) {
    res.status(500).json({
      error: "No se pudo realizar la operacion",
      mensaje: err.message,
      datos: null,
    });
  }
});

ruta.get("/nuevo", async (req, res) => {
  try {
    res.render("nuevo-docente");
  } catch (err) {}
});

ruta.post("/nuevo", async (req, res) => {
  try {
    const nuevoDocente = await userService.agregarUsuario({
      ...req.body,
      type: "teacher",
    });
    req.session.action = { name: nuevoDocente.name, add: true };
    res.redirect("/gestor-docentes");
  } catch (err) {}
});

module.exports = ruta;
