const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfile = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    tel: "string",
    ville: "string",//city
    pays: "string",//country
    codepostal: "string",//postalcode
    bio: "string",
    adresse: "string",//address
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("profiles", UserProfile);
