exports.seed = knex => {
  return knex("users")
    .del()
    .then(() =>
      knex("users").insert([
        {
          id: 1,
          username: "rabah_babaci",
          password: "rabah",
          department: "admin",
        },
      ])
    );
};
