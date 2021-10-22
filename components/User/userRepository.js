const userModel = require("./userModel");

const obtenerInfo = async (query, options) => {
  return await userModel.find(query, options);
};

const actualizar = async (datosNuevos) => {
  const admin = await userModel.findOneAndUpdate(
    { true: true },
    { ...datosNuevos },
    { new: true }
  );
  return admin;
};

verificarCredenciales = async (credentials) => {
  const user = await userModel.findOne({
    email: credentials.email,
    password: credentials.password,
  });

  return {
    name: user.name,
    type: user.type,
  };
};

module.exports = {
  actualizar,
  obtenerInfo,
  verificarCredenciales,
};
