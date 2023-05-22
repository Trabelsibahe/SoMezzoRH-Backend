const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rdv = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    maladie: "string",
    commentaire: "string",
    date : Date,
    etat:"string",

  },
      {
        timestamps: true,
      }
);

module.exports = mongoose.model('rdv', rdv);