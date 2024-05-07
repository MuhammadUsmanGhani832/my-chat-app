const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "MyChatAppAuth" }
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MyChatAppMessage"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "MyChatAppParticipant",
  participantSchema,
  "my-chat-app_participants"
);
