import mongoose from 'mongoose';
import connectDB from './database';
import { env } from './env'; // Import env to ensure MONGODB_URI is available

// Mocking mongoose for unit tests
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  plugin: jest.fn(),
  connection: {
    on: jest.fn(),
    once: jest.fn(),
    off: jest.fn(),
    close: jest.fn(),
  },
}));

// Mock console.error and console.log to prevent polluting test output and check calls
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Database Connection', () => {
  let originalExit: (code?: number) => never;

  beforeAll(() => {
    // Store original process.exit and mock it to prevent exiting the test runner
    originalExit = process.exit;
    (process as any).exit = jest.fn() as (code?: number) => never;

    // Set a dummy MONGODB_URI for tests, as env.ts expects it
    process.env.MONGODB_URI = 'mongodb://localhost:27017/testdb';
    process.env.NODE_ENV = 'test';
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (mongoose.connect as jest.Mock).mockClear();
    (mongoose.plugin as jest.Mock).mockClear();
    consoleErrorSpy.mockClear();
    consoleLogSpy.mockClear();
  });

  afterAll(() => {
    // Restore original process.exit
    process.exit = originalExit;
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it('should connect to MongoDB successfully', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValueOnce(undefined);

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(mongoose.connect).toHaveBeenCalledWith(env.MONGODB_URI);
    expect(consoleLogSpy).toHaveBeenCalledWith('MongoDB connected successfully!');
    expect(mongoose.plugin).toHaveBeenCalledTimes(1);
    // @ts-ignore
    expect(mongoose.plugin).toHaveBeenCalledWith(expect.any(Function), { overrideMethods: 'all' });
  });

  it('should retry connection on failure and then connect successfully', async () => {
    (mongoose.connect as jest.Mock)
      .mockRejectedValueOnce(new Error('Connection error'))
      .mockResolvedValueOnce(undefined);

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledTimes(2);
    expect(consoleErrorSpy).toHaveBeenCalledWith('MongoDB connection error:', expect.any(Error));
    expect(consoleLogSpy).toHaveBeenCalledWith('Retries left: 4');
    expect(consoleLogSpy).toHaveBeenCalledWith('MongoDB connected successfully!');
  });

  it('should exit process if connection fails after multiple retries', async () => {
    (mongoose.connect as jest.Mock).mockRejectedValue(new Error('Persistent connection error'));

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledTimes(5); // Initial attempt + 4 retries
    expect(consoleErrorSpy).toHaveBeenCalledWith('MongoDB connection error:', expect.any(Error));
    expect(consoleLogSpy).toHaveBeenCalledWith('Retries left: 0');
    expect(consoleErrorSpy).toHaveBeenCalledWith('MongoDB connection failed after multiple retries.');
    expect(process.exit).toHaveBeenCalledWith(1);
  }, 30000); // Increase timeout for this test due to retries
});
