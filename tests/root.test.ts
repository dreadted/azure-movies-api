import app from "../src/app";
import request from "supertest";

describe("GET /api/v1", () => {
  test("should have links to genres, movies and actors", async () => {
    const result = await request(app).get("/api/v1");
    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty("_links");
    expect(result.body._links).toHaveLength(3);
    expect(result.body._links[0]).toHaveProperty("genres");
    expect(result.body._links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          genres: { href: expect.stringContaining("http") }
        }),
        expect.objectContaining({
          movies: { href: expect.stringContaining("http") }
        }),
        expect.objectContaining({
          actors: { href: expect.stringContaining("http") }
        })
      ])
    );
  });
});

describe("POST /api/v1", () => {
  test("should return status code 405", async () => {
    const result = await request(app).post("/api/v1");
    expect(result.status).toEqual(405);
  });
});

describe("PUT /api/v1", () => {
  test("should return status code 405", async () => {
    const result = await request(app).put("/api/v1");
    expect(result.status).toEqual(405);
  });
});

describe("PATCH /api/v1", () => {
  test("should return status code 405", async () => {
    const result = await request(app).patch("/api/v1");
    expect(result.status).toEqual(405);
  });
});

describe("DELETE /api/v1", () => {
  test("should return status code 405", async () => {
    const result = await request(app).delete("/api/v1");
    expect(result.status).toEqual(405);
  });
});
