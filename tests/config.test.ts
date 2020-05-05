import config from "../src/lib/config";

describe("Testing environment", () => {
  test("should test that NODE_ENV = 'test'", () => {
    expect(process.env.NODE_ENV).toBe("test");
  });

  test("should test that config.database = TEST", () => {
    expect(config.database).toBe("Movies-TEST");
  });
});
