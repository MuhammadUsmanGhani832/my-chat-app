const jwt = require("jsonwebtoken");

const jwtService = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.MY_SECRET_KEY, {
    expiresIn: "15d"
  });

  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24 * 5,
    httpOnly: true,
    sameSite: "strict"
  });
};

module.exports = jwtService;
