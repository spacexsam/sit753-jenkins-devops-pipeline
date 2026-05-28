const request = require("supertest");
const app = require("../app");

describe("SIT753 DevOps App Tests", () => {
  test("GET / should return app running message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("SIT753 Jenkins DevOps Pipeline App");
  });

  test("GET /health should return UP status", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("UP");
  });

  test("GET /users should return users list", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});