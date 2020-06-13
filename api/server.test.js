const request = require("supertest");

const server = require("./server");

describe("testing server.js", () => {
  it("should run in the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET endpoint /", () => {
    it("should return 200 OK", async () => {
      const res = await request(server).get("/");

      expect(res.status).toBe(200);
    });

    it("should return ta JSON object", async () => {
      const res = await request(server).get("/");

      expect(res.body).toEqual({ message: "*** API is up! ***" });
    });
  });
});
