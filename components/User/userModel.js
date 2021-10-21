const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  other: {
    type: Object,
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
  type: {
    type: String,
    required: true,
  },
});

const userModel = model("user", userSchema);

module.exports = userModel;
