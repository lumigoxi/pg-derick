const { Router } = require("express");

const userService = require("../User/userService");

const ruta = Router();

ruta.get("/", async (req, res) => {
  try {
    const teachers = await userService.obtenerInfo({ type: "teacher" }, [
      "name",
      "other",
    ]);
    const data = [];
    teachers.forEach((element) => {
      data.push({ name: element.name, other: element.other, id: element._id });
    });
    res.render("gestor-docentes", { teachers: data });
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
    res.render("editar-docente", { teacher: teacher });
  } catch (err) {
    res.status(500).json({
      error: "Error inesperado",
      mensaje: err.message,
      datos: null,
    });
  }
});

// ruta.patch("/", async (req, res) => {
//   try {
//     const admin = await userService.actualizarInfo(req);
//     res.status(200).json({
//       error: null,
//       mensaje: "Admin actualizado con exito",
//       datos: admin,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: "No se pudo realizar la operacion",
//       mensaje: err.message,
//       datos: null,
//     });
//   }
// });

module.exports = ruta;
