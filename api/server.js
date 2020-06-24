const Axios = require("axios");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

server.use(express.json());
// server.use(helmet());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.post("/api/recommend", async (req, res) => {
  try {
    const data = req.body;
    const res = await Axios.post("https://medicabi.herokuapp.com/send", data);
    res.status(200).json(res.data);
  } catch (error) {
    res.status(500).json({ message: "Catch block" });
  }
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "*** API is up! ***" });
});

const errorHandler = (error, req, res, next) => {
  const code = error.status || error.statusCode || 500;

  res.status(code).json(error);
};

server.use(errorHandler);

module.exports = server;
