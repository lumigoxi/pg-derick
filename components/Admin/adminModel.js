const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  establecimiento: {
    type: String,
    required: true,
    lowercase: true,
  },
  localidad: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
  },
});

const adminModel = model("admin", adminSchema);

module.exports = adminModel;
