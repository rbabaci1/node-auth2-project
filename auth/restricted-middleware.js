const jwt = require("jsonwebtoken");

const secrets = require("../utils/secrets");

module.exports = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const [directive, token] = authorization ? authorization : [false, false];

    if (directive !== "bearer") {
      res
        .status(401)
        .json({ message: "Please provide token type in headers." });
    } else if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Invalid credentials, try again?" });
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      });
    } else {
      throw new Error("Invalid credentials.");
    }
  } catch ({ message, statusCode }) {
    next({
      message: "User can not be authenticated at this moment.",
      reason: message,
      statusCode,
    });
  }
};
