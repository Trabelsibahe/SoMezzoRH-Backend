const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    utilisateur: "string",
    matricule: {
      type: "string",
      trim: true,//sans espace 
      unique: true,
    },
    password: "string",
    role: "string",
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", User);