const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Absence = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      },
      absences: [
        {
          type: {
            type: String,
            required: true
          },
          dateDebut: {
            type: Date,
            required: true
          },
          dateFin: {
            type: Date,
            required: true
          },
          commentaire: String,
          etat: String,
          justif : String,
          motif : String,
        }
      ]
    },
    {
      timestamps: true
    }
)
  module.exports = mongoose.model("absences", Absence);