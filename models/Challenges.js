const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    titre: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    dateCreation: {
      type: Date,
      default: Date.now
    },
    dateSuppression: {
      type: Date
    },
    priorite: {
      type: String
    },
    prime: {
      type: "number"
    },
    participer: {
      type: String
    },
    participants: {
      type: Number,
      default: 0
    },
    participantsIds: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      participations: {
        type: "number",
        default: 0
      },
      valide: {
        type: Boolean,
        default: false,
      },
      total: {
        type: Number
      },

    }]
  },
  {
    timestamps: true
  }
);



const Challenge = mongoose.model("Challenge", ChallengeSchema);

module.exports = Challenge;
