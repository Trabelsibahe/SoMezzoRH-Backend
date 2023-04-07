const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Absence = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      },
    type:"string",
    dateDebut:"date",
    deteFin:"date",
    commentaire:"string",
    etat:"Boolean"

  
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("absence", Absence);