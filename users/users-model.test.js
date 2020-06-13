const db = require("../database/dbConfig");
const Users = require("./users-model");

const mockUser = {
  firstName: "Kyla",
  lastName: "Gifford",
  username: "kyla1997",
  password: "kyla",
  department: "sales",
};

describe("users model", () => {
  describe("add()", () => {
    it("should insert a user into the DB", async () => {
      const insertedUser = await Users.add(mockUser);
    });
  });
});
