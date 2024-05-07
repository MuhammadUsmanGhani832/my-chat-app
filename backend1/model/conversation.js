const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestAuth"
      }
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestMessage"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("TestConversation", conversationSchema);
