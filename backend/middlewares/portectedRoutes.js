const jwt = require("jsonwebtoken");
const User = require("../model/auth.model");

const protectedRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: no token provided" });
    }

    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;
    next();
  } catch (error) {
    console.log("error in protected Routes", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = protectedRoutes;
