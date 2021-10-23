const { Router } = require("express");
const { actualizarPorId } = require("../User/userRepository");

const userService = require("../User/userService");

const ruta = Router();

ruta.get("/", async (req, res) => {
  let myAction = {};
  if (req.session.action) {
    myAction = req.session.action;
    req.session.action = null;
  }
  try {
    const student = await userService.obtenerInfo(
      {
        type: "student",
      },
      ["name", "other"]
    );

    const data = [];
    student.forEach((element) => {
      if (
        element.other.grado === req.session.user.grado &&
        element.other.seccion === req.session.user.seccion
      )
        data.push({
          name: element.name,
          other: element.other,
          id: element._id,
        });
    });

    res.render("gestor-alumnos", {
      alumnos: data,
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

    let recursos = [];
    let bandera = false;
    req.session.user.recursos.forEach((element) => {
      if (teacher[0].other.recursos) {
        teacher[0].other.recursos.forEach((elem) => {
          if (element.name === elem) {
            recursos.push({ name: elem, check: true });
            bandera = true;
            return;
          }
        });
      }
      if (bandera) {
        bandera = false;
        return;
      }
      recursos.push({ name: element.name, check: false });
    });

    const data = {
      name: teacher[0].name,
      email: teacher[0].email,
      password: teacher[0].password,
      other: teacher[0].other,
      id: teacher[0]._id,
      recursos: recursos,
    };
    console.log(data);
    res.render("editar-alumno", { alumno: data, name: data.name });
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
    let recursos = [];
    if (req.body.recursos)
      [
        req.body.recursos.forEach((element) => {
          recursos.push(element);
        }),
      ];
    const formatData = {
      ...req.body,
      other: {
        grado: req.body.grado,
        seccion: req.body.seccion,
        recursos: recursos,
      },
    };
    const student = await userService.actualizarPorId(
      req.params.id,
      formatData
    );
    if (student.name) {
      req.session.action = { edit: "true", name: student.name };
    }
    res.redirect("/gestor-alumnos");
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
    res.render("nuevo-alumno");
  } catch (err) {}
});

ruta.post("/nuevo", async (req, res) => {
  try {
    let recursos = [];
    if (req.body.recursos)
      [
        req.body.recursos.forEach((element) => {
          recursos.push(element);
        }),
      ];
    const nuevoStudent = await userService.agregarUsuarioStudent({
      ...req.body,
      recursos: recursos,
      type: "student",
    });
    req.session.action = { name: nuevoStudent.name, add: true };
    res.redirect("/gestor-alumnos");
  } catch (err) {}
});

ruta.get("/eliminar/:id", async (req, res) => {
  try {
    const teacher = await userService.obtenerInfo({ _id: req.params.id });
    const data = {
      name: teacher[0].name,
      email: teacher[0].email,
      password: teacher[0].password,
      other: teacher[0].other,
      id: teacher[0]._id,
    };
    res.render("eliminar-alumno", { teacher: data, name: data.name });
  } catch (err) {
    res.status(500).json({
      error: "No se pudo realizar la operacion",
      mensaje: err.message,
      datos: null,
    });
  }
});

ruta.post("/eliminar/:id", async (req, res) => {
  try {
    const result = await userService.eliminarUser(req.params.id);
    req.session.action = { delete: true, name: result.name };
    res.redirect("/gestor-alumnos");
  } catch (err) {}
});

ruta.get("/actividades-all", async (req, res) => {
  res.render("actividades-all", { recursos: req.session.user.recursos });
});

ruta.post("/actividades-all", async (req, res) => {
  const data = [];
  req.body.recursos.forEach((element) => {
    data.push(element);
  });
  const result = await userService.actualizarMany(data, {
    grado: req.session.user.grado,
    seccion: req.session.user.seccion,
  });
  console.log(result);
  res.send(result);
});

module.exports = ruta;
