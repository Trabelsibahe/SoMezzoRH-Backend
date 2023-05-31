const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    nom: "string",
    prenom : "string",
    matricule: {
      type: "string",
      trim: true, //sans espace 
      unique: true,
    },
    password: "string",
    role: "string",
    operation: "string",
    titre : "string",
    active : "Boolean",
    email:{
      type: String,
      trim:true,
      unique:true,
    },
    resetToken: { type: String, default: null }
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", User);
