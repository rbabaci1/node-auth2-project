const db = require("../database/dbConfig");
const Users = require("./users-model");

const mockData = require("../utils/mockData");

describe("users model", () => {
  describe("add()", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("should insert a user into the DB", async () => {
      await Users.add(mockData[0]);
      await Users.add(mockData[1]);

      const users = await db("users");
      expect(users).toHaveLength(2);
    });

    it("should return the inserted user", async () => {
      let insertedUser = await Users.add(mockData[0]);
      expect(insertedUser.firstName).toBe("Kyla");

      insertedUser = await Users.add(mockData[1]);
      expect(insertedUser.firstName).toBe("Nancy");
    });
  });
});
