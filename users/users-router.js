const router = require("express").Router();

const Users = require("../users/users-model");

router.get("/", async (req, res, next) => {
  const users = await Users.get();

  res.status(200).json({ users });
});

module.exports = router;
