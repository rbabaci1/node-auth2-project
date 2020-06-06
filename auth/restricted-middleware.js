const jwt = require("jsonwebtoken");

const secrets = require("../utils/secrets");

module.exports = (req, res, next) => {
  try {
    const [directive, token] = req.headers.authorization.split(" ");

    if (directive !== "bearer") {
      res
        .status(401)
        .json({ message: "Please provide token type in headers." });
    }
    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Invalid credentials, try again?" });
        } else {
          req.decodedJwt = decodedToken;
          console.log(decodeToken);
          next();
        }
      });
    } else {
      throw new Error("Invalid credentials.");
    }
  } catch ({ message, statusCode }) {
    next({
      message: "Can't authenticate this user at this moment.",
      reason: message,
      statusCode,
    });
  }
};
