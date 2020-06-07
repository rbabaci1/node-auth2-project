const router = require("express").Router();

const Users = require("../users/users-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, async (req, res, next) => {
  try {
    const department = req.query.department;
    const users = await Users.getByDepartment(department);

    res.status(200).json({ users });
  } catch ({ message, statusCode }) {
    next({
      message: "Users can not be retrieved at this moment.",
      reason: message,
      statusCode,
    });
  }
});

module.exports = router;
