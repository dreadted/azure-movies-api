import request from "supertest";
import app from "../src/app";
import { Movie } from "../src/models/Movie";

describe("GET /api/v1/movies", () => {
  test("should return movies.", async () => {
    const res = await request(app).get("/api/v1/movies");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          ["image-url"]: expect.stringContaining("http"),
          ["production-year"]: expect.any(Number),
          ["created-at"]: expect.any(String)
        })
      ])
    );
  });
});

describe("POST /api/v1/movies", () => {
  const testMovie = {
    name: "Test Movie",
    description: "Test Movie description...",
    ["image-url"]: "http://example.com",
    ["production-year"]: 1900
  };

  test("should return formatted genre with status code 201", async () => {
    const res = await request(app).post("/api/v1/movies").send(testMovie);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual(expect.objectContaining({ name: "Test Movie" }));
  });
});

describe("PUT /api/v1/movies/108", () => {
  const testMovie = {
    id: 108,
    name: "Updated Movie",
    description: "Updated Movie description...",
    ["image-url"]: "http://updated.com",
    ["production-year"]: 2020
  };
  test("should return updated value", async () => {
    const res = await request(app).put("/api/v1/movies/108").send(testMovie);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("name", "Updated Movie");
  });
});

describe("PATCH /api/v1/movies", () => {
  test("should return status code 405", async () => {
    const res = await request(app).patch("/api/v1/movies");
    expect(res.status).toEqual(405);
  });
});

describe("DELETE /api/v1/movies/108", () => {
  test("should return status code 200", async () => {
    const res = await request(app).delete("/api/v1/movies/108");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("id", 108);
  });
});
