const adminRepository = require("./adminRepository");
const { Error } = require("mongoose");

const obtenerInfo = async () => {
  try {
    const admin = await adminRepository.obtenerInfo();
    return admin;
  } catch (error) {
    console.log("[adminService] " + error.message);
    throw new Error("Algo salio mal, intente mas tarde");
  }
};

const actualizarInfo = async ({ body: datosNuevos }) => {
  try {
    const admin = await adminRepository.actualizar(datosNuevos);
    return admin;
  } catch (error) {
    console.log("[adminService] " + error.message);
    throw new Error("Algo salio mal, intente mas tarde");
  }
};

const obtenerUsuario = async ({ body: credentials }) => {
  try {
    const user = await adminRepository.verificarCredenciales(credentials);
    if (!user.name) {
      user = teachRepository.verificarCredenciales(credentials);
      user.type = "teach";
    }

    if (!user.name) {
      user = studentRepository.verificarCredenciales(credentials);
      user.type = "student";
    }

    //posible bug, quitar el or
    return {
      name: user.name,
      type: user.type || "admin",
    };
  } catch (error) {}
};

module.exports = {
  obtenerInfo,
  actualizarInfo,
  obtenerUsuario,
};
