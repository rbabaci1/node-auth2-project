const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const secrets = require("../utils/secrets");
const validateCredentials = require("../utils/validation-middleware");
const Users = require("../users/users-model");
const generateToken = require("../utils/generateToken");

router.post("/register", validateCredentials, async (req, res, next) => {
  try {
    const user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(user.password, rounds);

    const addedUser = await Users.add({ ...user, password: hash });
    const token = generateToken(addedUser);

    res.status(201).json({ addedUser, token });
  } catch ({ statusCode, message }) {
    next({
      message: "The user could not be added at this moment.",
      reason: message,
      statusCode,
    });
  }
});

module.exports = router;
