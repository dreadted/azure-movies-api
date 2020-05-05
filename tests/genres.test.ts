import app from "../src/app";
import request from "supertest";

describe("GET /api/v1/genres", () => {
  test("should return genres 'Action', 'Thriller', 'Comedy' and 'Sci-fi'.", async () => {
    const res = await request(app).get("/api/v1/genres");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Action"
        }),
        expect.objectContaining({
          name: "Thriller"
        }),
        expect.objectContaining({
          name: "Comedy"
        }),
        expect.objectContaining({
          name: "Sci-fi"
        })
      ])
    );
  });
});

describe("POST /api/v1/genres", () => {
  test("should return formatted genre with status code 201", async () => {
    const res = await request(app)
      .post("/api/v1/genres")
      .send({ name: "TEST" });
    expect(res.status).toEqual(201);
    expect(res.body).toEqual(expect.objectContaining({ name: "Test" }));
  });
});

describe("PUT /api/v1/genres/9", () => {
  test("should return updated value", async () => {
    const res = await request(app)
      .put("/api/v1/genres/9")
      .send({ name: "updated" });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("name", "Updated");
  });
});

describe("PATCH /api/v1/genres", () => {
  test("should return status code 405", async () => {
    const res = await request(app).patch("/api/v1/genres");
    expect(res.status).toEqual(405);
  });
});

describe("DELETE /api/v1/genres/9", () => {
  test("should return status code 200", async () => {
    const res = await request(app).delete("/api/v1/genres/9");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("id", 9);
  });
});
