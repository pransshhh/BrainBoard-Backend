import mongoose from "mongoose";
import connectDB from "./db";

// Mock mongoose
jest.mock("mongoose", () => ({
  connect: jest.fn(),
  connection: {
    host: "mocked_host",
  },
}));

// Mock console logs
const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

// Mock process.exit
const exitSpy = jest.spyOn(process, "exit").mockImplementation((() => {}) as any); // Type assertion for mock

describe("connectDB", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    process.env.MONGO_URI = "mongodb://localhost:27017/testdb"; // Ensure MONGO_URI is set for env validation
  });

  afterAll(() => {
    // Restore console and process.exit after all tests
    consoleSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  it("should connect to MongoDB successfully and log a success message", async () => {
    (mongoose.connect as jest.Mock).mockResolvedValueOnce({
      connection: { host: "mocked_host" },
    });

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
    expect(consoleSpy).toHaveBeenCalledWith("✅ MongoDB Connected: mocked_host");
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(exitSpy).not.toHaveBeenCalled();
  });

  it("should log an error message and exit the process on connection failure", async () => {
    const errorMessage = "Connection failed";
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
    expect(consoleErrorSpy).toHaveBeenCalledWith(`❌ Error: ${errorMessage}`);
    expect(consoleSpy).not.toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
