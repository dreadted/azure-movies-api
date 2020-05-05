import request from "supertest";
import app from "../src/app";

describe("GET /api/v1/actors", () => {
  test("should return actors.", async () => {
    const res = await request(app).get("/api/v1/actors");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          ["first-name"]: expect.any(String),
          ["last-name"]: expect.any(String),
          ["created-at"]: expect.any(String),
          _links: expect.arrayContaining([
            expect.objectContaining({
              self: { href: expect.stringContaining("http") }
            }),
            expect.objectContaining({
              roles: { href: expect.stringContaining("http") }
            })
          ])
        })
      ])
    );
  });
});

describe("POST /api/v1/actors", () => {
  const testActor = {
    ["first-name"]: "Test",
    ["last-name"]: "Testing"
  };

  test("should return formatted actor with status code 201", async () => {
    const res = await request(app).post("/api/v1/actors").send(testActor);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual(expect.objectContaining(testActor));
  });
});

describe("PUT /api/v1/actors/29", () => {
  const testActor = {
    ["first-name"]: "Jonah",
    ["last-name"]: "Jones"
  };

  test("should return updated value", async () => {
    const res = await request(app).put("/api/v1/actors/29").send(testActor);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining(testActor));
  });
});

describe("PATCH /api/v1/actors", () => {
  test("should return status code 405", async () => {
    const res = await request(app).patch("/api/v1/actors");
    expect(res.status).toEqual(405);
  });
});

describe("DELETE /api/v1/actors/29", () => {
  test("should return status code 200", async () => {
    const res = await request(app).delete("/api/v1/actors/29");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("id", 29);
  });
});
