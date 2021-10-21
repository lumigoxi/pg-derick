const adminModel = require("./adminModel");

const obtenerInfo = async () => {
  return await adminModel.find();
};

const actualizar = async (datosNuevos) => {
  const admin = await adminModel.findOneAndUpdate(
    { true: true },
    { ...datosNuevos },
    { new: true }
  );
  return admin;
};

verificarCredenciales = async (credentials) => {
  const user = await adminModel.findOne({
    email: credentials.email,
    password: credentials.password,
  });

  return {
    name: user.establecimiento,
  };
};

module.exports = {
  actualizar,
  obtenerInfo,
  verificarCredenciales,
};
