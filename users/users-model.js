const db = require("../database/dbConfig");

const findBy = filter => db("users").where(filter).first();

const add = async newUser => {
  const [id] = await db("users").insert(newUser);

  return findBy({ id });
};

module.exports = { add };
