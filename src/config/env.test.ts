import { env } from "./env"; // Import the module to be tested
import { z } from "zod";

describe("Environment Variables Validation (env.ts)", () => {
  const originalProcessEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clears the module cache to reload env.ts with new process.env
    process.env = { ...originalProcessEnv }; // Reset process.env for each test

    // Set valid default values to avoid other validation errors
    process.env.NODE_ENV = "development";
    process.env.PORT = "3000";
  });

  afterAll(() => {
    process.env = originalProcessEnv; // Restore original process.env
  });

  it("should validate a valid MONGO_URI", () => {
    process.env.MONGO_URI = "mongodb://localhost:27017/testdb";
    const { env } = require("./env"); // Reload env.ts to pick up new process.env
    expect(env.MONGO_URI).toBe("mongodb://localhost:27017/testdb");
  });

  it("should throw an error for an invalid MONGO_URI (not a URL)", () => {
    process.env.MONGO_URI = "invalid-mongo-uri";
    // Expect process.exit to be called and an error to be logged
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const exitSpy = jest.spyOn(process, "exit").mockImplementation((() => {}) as any);

    try {
      require("./env"); // Reload env.ts
    } catch (e) {
      // The module itself calls process.exit, so we don't expect a thrown error here
      // Instead, we check if process.exit was called.
    }

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  it("should throw an error if MONGO_URI is missing", () => {
    delete process.env.MONGO_URI; // Remove MONGO_URI

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const exitSpy = jest.spyOn(process, "exit").mockImplementation((() => {}) as any);

    try {
      require("./env"); // Reload env.ts
    } catch (e) {
      // See comment above
    }

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});
