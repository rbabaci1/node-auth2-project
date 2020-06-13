const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../utils/secrets");
const HALF_HOUR = 60 * 30;

const generateToken = ({ id, username, department }) => {
  const payload = { subject: id, username, department };

  const options = {
    expiresIn: HALF_HOUR,
    audience: "user",
  };

  return jwt.sign(payload, jwtSecret, options);
};

module.exports = generateToken;
