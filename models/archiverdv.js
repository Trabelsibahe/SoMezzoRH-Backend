const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const archiverdv = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    maladie: "string",
    commentaire: "string",
    date : Date,
    etat:"string",
    motif : "string",
    capacite : "number",

  },
      {
        timestamps: true,
      }
);

module.exports = mongoose.model('archiverdv', archiverdv);