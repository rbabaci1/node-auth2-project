const router = require("express").Router();
const bcrypt = require("bcryptjs");

const validateCredentials = require("../utils/validation-middleware");
const Users = require("../users/users-model");
const generateToken = require("../utils/generateToken");

router.post(
  "/register",
  validateCredentials("register"),
  async (req, res, next) => {
    try {
      const user = req.body;
      const hash = bcrypt.hashSync(user.password, 8);
      user.password = hash;

      const addedUser = await Users.add(user);
      const token = generateToken(addedUser);

      res.status(201).json({ addedUser, token });
    } catch ({ message }) {
      next({
        message: "The user could not be added at this moment.",
        reason: message,
      });
    }
  }
);

router.post("/login", validateCredentials("login"), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({ message: "Welcome!", user, token });
    } else {
      res.status(401).json({ message: "Invalid credentials. Try again?" });
    }
  } catch ({ message }) {
    next({
      message: "The user could not login at this moment.",
      reason: message,
    });
  }
});

module.exports = router;
