import request from "supertest";
import app from "../src/app";

describe("GET /api/v1/actors/10/roles", () => {
  test("should return roles.", async () => {
    const res = await request(app).get("/api/v1/actors/10/roles");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          ["movie-id"]: expect.any(Number),
          ["actor-id"]: expect.any(Number),
          _links: expect.arrayContaining([
            expect.objectContaining({
              movie: { href: expect.stringContaining("http") }
            }),
            expect.objectContaining({
              actor: { href: expect.stringContaining("http") }
            })
          ])
        })
      ])
    );
  });
});

describe("POST /api/v1/actors/1/roles/77", () => {
  const testRole = {
    name: "Testname"
  };

  test("should return formatted role with status code 201", async () => {
    const res = await request(app)
      .post("/api/v1/actors/1/roles/77")
      .send(testRole);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual(expect.objectContaining(testRole));
  });
});

describe("PUT /api/v1/actors/1/roles", () => {
  test("should return status code 405", async () => {
    const res = await request(app).put("/api/v1/actors/1/roles");
    expect(res.status).toEqual(405);
  });
});

describe("PATCH /api/v1/actors/1/roles", () => {
  test("should return status code 405", async () => {
    const res = await request(app).patch("/api/v1/actors/1/roles");
    expect(res.status).toEqual(405);
  });
});

describe("DELETE /api/v1/actors/1/roles/77/34", () => {
  test("should return status code 200", async () => {
    const res = await request(app).delete("/api/v1/actors/1/roles/77/34");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        ["movie-id"]: expect.any(Number),
        ["actor-id"]: expect.any(Number),
        _links: expect.arrayContaining([
          expect.objectContaining({
            movie: { href: expect.stringContaining("http") }
          }),
          expect.objectContaining({
            actor: { href: expect.stringContaining("http") }
          })
        ])
      })
    );
  });
});
