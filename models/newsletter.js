const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Newsletter = new Schema(
  {
    titre: "string",
    description: "string",
    imgurl: "string",
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("newsletters", Newsletter);
