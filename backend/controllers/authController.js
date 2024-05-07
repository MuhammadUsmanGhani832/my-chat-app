const User = require("../model/auth.model");
const createAndSendToken = require("../utils/jwtService");
const bcrypt = require("bcryptjs");

const authController = {
  async signup(req, res, next) {
    try {
      const { fullName, username, password, confirmPassword, gender } =
        req.body;
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Password don't match" });
      }
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ error: "User already exits" });
      }
      const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        fullName,
        password: hashedPassword,
        username,
        gender,
        profilePicture: gender === "male" ? boyProfile : girlProfile
      });

      if (newUser) {
        createAndSendToken(newUser._id, res);
        await newUser.save();

        res.status(202).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          gender: newUser.gender,
          profilePicture: newUser.profilePicture
        });
      }
    } catch (error) {
      console.log("error in signup", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const newUser = await User.findOne({ username });
      if (!newUser) {
        return res.status(409).json({ error: "User not found" });
      }
      const decoded = await bcrypt.compare(password, newUser.password);
      if (!decoded) {
        return res.status(400).json({ error: "Password not match" });
      }

      res.status(202).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        gender: newUser.gender,
        profilePicture: newUser.profilePicture
      });
    } catch (error) {
      console.log("error in login", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async logout(req, res) {
    try {
      res.clearCookie("jwt");
      res.status(200).json({ message: "logout success" });
    } catch (error) {
      console.log("error in logout", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getAll(req, res) {
    try {
      const loggedInUser = req.user._id;

      const allUsers = await User.find({ _id: { $ne: loggedInUser } });

      res.status(200).json(allUsers);
    } catch (error) {
      console.log("error in get all users ", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = authController;
