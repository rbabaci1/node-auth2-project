const db = require("../database/dbConfig");

const findBy = filter => db("users").where(filter).first();

const add = async newUser => {
  const [id] = await db("users").insert(newUser);

  return findBy({ id });
};

const get = () => db("users");

module.exports = { add, get, findBy };
