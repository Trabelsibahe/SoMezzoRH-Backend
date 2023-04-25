const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      },
    titre: "string",
    description: "string",
    dateCreation: Date,
    dateSuppression: Date,
    priorite: "string"
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("task", Task);
