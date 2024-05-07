const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("TestAuth", authSchema);
