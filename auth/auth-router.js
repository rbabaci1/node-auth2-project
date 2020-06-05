const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../utils/secrets");

router.post("/register", async (req, res, next) => {});

module.exports = router;
