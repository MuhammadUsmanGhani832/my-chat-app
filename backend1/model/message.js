const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestAuth"
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestAuth"
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

module.exports = mongoose.model("TestMessage", messageSchema);
