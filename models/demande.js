const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Demande = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      },
    type: "string",
    commentaire: "string",
    etat: "string",
    attestation:"string",
    rdv : Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("demande", Demande);
