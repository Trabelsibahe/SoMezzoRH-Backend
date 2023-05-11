const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sante = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      },
    commentaire: "string",
    etat: "string",
    rdv : Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sante", Sante);