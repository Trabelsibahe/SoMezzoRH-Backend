const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Notification = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    notifications: [
      {
        message: String,
        journal : String,
        creationDate: Date,
        read: {
          type: Boolean,
          default: false
        },
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notifications", Notification);
