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

const verificarCredenciales = async (credentials) => {
  const user = await userModel.findOne({
    email: credentials.email,
    password: credentials.password,
  });

  return {
    name: user.name,
    type: user.type,
    seccion: user.other.seccion,
    grado: user.other.grado,
    recursos: user.other.recursos,
    id: user.id,
  };
};

const actualizarPorId = async (id, datosNuevos) => {
  const admin = await userModel.findByIdAndUpdate(
    { _id: id },
    { ...datosNuevos },
    { new: true }
  );
  return admin;
};

const nuevoUsuario = async (datos) => {
  const nuevoUsuario = new userModel(datos);
  return nuevoUsuario.save();
};

const deleteUserById = async (id) => {
  const result = await userModel.findByIdAndDelete({ _id: id });
  return result;
};

const actualizarMany = async (datos, filter) => {
  const result = await userModel.updateMany(
    {
      type: "student",
      "other.grado": filter.grado,
      "other.seccion": filter.seccion,
    },
    {
      "other.recursos": [...datos],
    }
  );

  return result;
};

const actualizarRecursos = async (id, datos) => {
  return await userModel.findOneAndUpdate(
    { _id: id },
    {
      "other.recursos": datos,
    }
  );
};

const buscarRecursos = async (id) => {
  const data = await userModel.findOne({ _id: id });
  return data;
};

module.exports = {
  actualizar,
  obtenerInfo,
  verificarCredenciales,
  actualizarPorId,
  nuevoUsuario,
  deleteUserById,
  actualizarMany,
  actualizarRecursos,
  buscarRecursos,
};
