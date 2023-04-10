const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définir le schéma de votre modèle pour la collection d'archives
const archives = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    tel: "number",
    ville: "string",//city
    pays: "string",//country
    codepostal: "number",//postalcode
    adresse: "string",//address
    avatar: "string",
    email:"string",
    datenaiss:"date",
    gouvernorat :"string",

  },
      {
        timestamps: true,
      }
);

// Créer le modèle pour la collection d'archives
module.exports = mongoose.model('archives', archives);