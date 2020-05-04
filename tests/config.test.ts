import { capitalize } from "../src/lib/utils";
import config from "../src/lib/config";

describe("Testing environment", () => {
  it("should test that NODE_ENV = 'test'", () => {
    expect(process.env.NODE_ENV).toBe("test");
  });

  it("should test that config.database = TEST", () => {
    expect(config.database).toBe("Movies-TEST");
  });

  it("should test that config.user = laurinc", () => {
    expect(config.user).toMatch("laurinc");
  });
});
