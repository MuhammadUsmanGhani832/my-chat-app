const jwt = require("jsonwebtoken");

const createAndSendToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.MY_SECRET_KEY, {
    expiresIn: "15d"
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSie: "strick"
  });
};

module.exports = createAndSendToken;
