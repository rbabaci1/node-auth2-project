const db = require("../database/dbConfig");
const Users = require("./users-model");
const mockData = require("../utils/mockData");

describe("users model", () => {
  describe("add()", () => {
    it("should insert a user into the DB", async () => {
      await Users.add(mockData[0]);
      await Users.add(mockData[1]);
    });
  });
});
