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
    const user = adminRepository.verificarCredenciales(credentials);
    if (!user) {
      user = teachRepository.verificarCredenciales(credentials);
    }

    if (!user) {
      user = studentRepository.verificarCredenciales(credentials);
    }

    return {
      name: user.establecimiento || user.name,
    };
  } catch (error) {}
};

module.exports = {
  obtenerInfo,
  actualizarInfo,
  obtenerUsuario,
};
