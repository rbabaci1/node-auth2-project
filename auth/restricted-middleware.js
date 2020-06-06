const jwt = require("jsonwebtoken");

const secrets = require("../utils/secrets");

module.exports = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const [directive, token] = authorization
      ? authorization.split(" ")
      : [false, false];

    if (token && directive == "Bearer") {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Invalid credentials. Try again?" });
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      });
    } else if (directive !== "Bearer") {
      res.status(401).json({
        message: `Token type name (Bearer) is not included in headers.`,
      });
    } else {
      throw new Error("User token is not included in headers.");
    }
  } catch ({ message, statusCode }) {
    next({
      message: "User can not be authenticated at this moment.",
      reason: message,
      statusCode,
    });
  }
};
