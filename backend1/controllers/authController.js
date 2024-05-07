const User = require("../model/auth.model");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/jwtService");

const authController = {
  async signup(req, res) {
    try {
      const { fullname, username, password, confirmpassword, gender } =
        req.body;
      if (password !== confirmpassword) {
        return res.status(400).json({ error: "Password not match" });
      }
      const userExits = await User.findOne({ username });
      if (userExits) {
        return res.status(400).json({ error: "user already exits" });
      }

      const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
      const hashPassword = await bcrypt.hash(password, 10);

      const user = new User({
        fullname,
        username,
        password: hashPassword,
        gender,
        profilePic: gender === "male" ? boyPic : girlPic
      });

      if (user) {
        createToken(user._id, res);
        await user.save();
        res.status(202).json(user);
      } else {
        res.status(402).json({ error: "User data not valid" });
      }
    } catch (error) {
      console.log("error in signup:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const userExits = await User.findOne({ username });
      if (!userExits) {
        return res.status(400).json({ error: "user not exits" });
      }

      const hashPassword = await bcrypt.compare(password, userExits.password);

      if (hashPassword) {
        createToken(userExits._id, res);
        res.status(200).json(userExits);
      } else {
        res.status(402).json({ error: "Wrong password" });
      }
    } catch (error) {
      console.log("error in login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async logout(req, res) {
    try {
      res.clearCookie("jwt", { maxAge: 0 });
      res.status(200).json({ message: "logout successfully" });
    } catch (error) {
      console.log("error in logout:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getAll(req, res) {
    try {
      const senderId = req.user._id;
      const users = await User.find({ id: { $ne: senderId } });
    } catch (error) {
      console.log("error in getall", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = authController;
