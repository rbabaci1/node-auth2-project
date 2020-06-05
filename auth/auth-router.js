const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../utils/secrets");
const { validateUserCredentials } = require("../utils/validation-middleware");
const Users = require("../users/users-model");

router.post("/register", validateUserCredentials, async (req, res, next) => {
  try {
    const user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS;
    const hash = bcrypt.hashSync(user.password, rounds);

    const addedUser = await Users.add({ ...user, password: hash });

    req.statusCode(201).json({ message: "" });
  } catch ({ errno, code, message }) {
    next({
      message: "The recipe could not be added at this moment.",
      errno,
      code,
      reason: message,
    });
  }
});

module.exports = router;
