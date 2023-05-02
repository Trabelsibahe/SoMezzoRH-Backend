const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Notification = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      },
    message: "string",
    lire: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notification", Notification);
