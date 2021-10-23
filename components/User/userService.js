const userRepository = require("./userRepository");
const { Error } = require("mongoose");

const obtenerInfo = async (query, options) => {
  if (!options) {
    options = {};
  }
  try {
    const admin = await userRepository.obtenerInfo(query, options);
    return admin;
  } catch (error) {
    console.log("[adminService] " + error.message);
    throw new Error("Algo salio mal, intente mas tarde");
  }
};

const actualizarInfo = async ({ body: datosNuevos }) => {
  try {
    const admin = await userRepository.actualizar(datosNuevos);
    return admin;
  } catch (error) {
    console.log("[adminService] " + error.message);
    throw new Error("Algo salio mal, intente mas tarde");
  }
};

const verificarCredenciales = async ({ body: credentials }) => {
  try {
    const user = await userRepository.verificarCredenciales(credentials);
    return {
      name: user.name,
      type: user.type,
      grado: user.grado,
      seccion: user.seccion,
      recursos: user.recursos,
      id: user.id,
    };
  } catch (error) {}
};

const actualizarPorId = async (id, datosNuevos) => {
  try {
    const formatData = {
      name: datosNuevos.name,
      email: datosNuevos.email,
      password: datosNuevos.password,
      other: {
        seccion: datosNuevos.seccion,
        grado: datosNuevos.grado,
        recursos: datosNuevos.recursos,
      },
    };
    const admin = await userRepository.actualizarPorId(id, formatData);
    return admin;
  } catch (error) {
    console.log("[adminService] " + error.message);
    throw new Error("Algo salio mal, intente mas tarde");
  }
};

const agregarUsuario = async (datos) => {
  const formatData = {
    ...datos,
    other: {
      grado: datos.grado,
      seccion: datos.seccion,
    },
  };
  delete formatData.grado;
  delete formatData.seccion;
  const nuevoUsuario = await userRepository.nuevoUsuario(formatData);
  return nuevoUsuario;
};

const agregarUsuarioStudent = async (datos) => {
  const formatData = {
    ...datos,
    other: {
      grado: datos.grado,
      seccion: datos.seccion,
      recursos: datos.recursos,
    },
  };
  delete formatData.grado;
  delete formatData.seccion;
  delete formatData.recursos;
  const nuevoUsuario = await userRepository.nuevoUsuario(formatData);
  return nuevoUsuario;
};

const eliminarUser = async (id) => {
  const result = userRepository.deleteUserById(id);
  return result;
};

const actualizarMany = async (datos, filter) => {
  return await userRepository.actualizarMany(datos, filter);
};

const actualizarRecursos = async (id, recursos) => {
  try {
    return await userRepository.actualizarRecursos(id, recursos);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  obtenerInfo,
  actualizarInfo,
  verificarCredenciales,
  actualizarPorId,
  agregarUsuario,
  eliminarUser,
  agregarUsuarioStudent,
  actualizarMany,
  actualizarRecursos,
};
