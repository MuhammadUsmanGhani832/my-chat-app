const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profilePicture: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "MyChatAppAuth",
  authSchema,
  "my-chat-app_auth"
);
