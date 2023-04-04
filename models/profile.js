const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfile = new Schema(
  {
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

module.exports = mongoose.model("profiles", UserProfile);
