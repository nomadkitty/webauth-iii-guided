const bcrypt = require("bcryptjs");

const secret = require("../config/secret.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "bad panda" });
      } else {
        req.username = decodedToken.username;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No token provided." });
  }
};
