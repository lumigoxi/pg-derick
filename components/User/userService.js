const userRepository = require("./userRepository");
const { Error } = require("mongoose");

const obtenerInfo = async () => {
  try {
    const admin = await userRepository.obtenerInfo();
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
    };
  } catch (error) {}
};

module.exports = {
  obtenerInfo,
  actualizarInfo,
  verificarCredenciales,
};
