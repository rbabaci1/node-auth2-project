const db = require("../database/dbConfig");

const findBy = filter => db("users").where(filter).first();

const add = async newUser => {
  const [id] = await db("users").insert(newUser, "id");

  return findBy({ id });
};

const get = () => db("users");

const getByDepartment = department => db("users").where({ department });

module.exports = { add, get, getByDepartment, findBy };
