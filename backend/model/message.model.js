const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MyChatAppAuth"
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MyChatAppAuth"
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "MyChatAppMessage",
  messageSchema,
  "my-chat-app_message"
);
