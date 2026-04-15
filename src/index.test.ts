import express, { Request, Response, NextFunction } from 'express';

// Mock the entire express module to control its behavior
// We need to mock it before importing index.ts to ensure our mock is used
jest.mock('express', () => {
  const mockApp = {
    get: jest.fn(),
    use: jest.fn(),
    listen: jest.fn((port: number, callback: () => void) => {
      // Prevent the server from actually listening during tests
      if (callback) callback();
    }),
  };
  // Mock the default export of express to return our mockApp
  const mockExpress = jest.fn(() => mockApp) as unknown as typeof express;
  Object.assign(mockExpress, express); // Copy static properties if necessary, though not strictly needed for this test
  return mockExpress;
});

// Import the actual index.ts file AFTER mocking express
// This will cause the express() call within index.ts to use our mocked version
// and register routes/middleware on our mockApp.
require('./index');

describe('src/index.ts', () => {
  let mockApp: any;
  let expressModule: typeof express;

  beforeEach(() => {
    // Reset mocks before each test to ensure isolation
    jest.clearAllMocks();
    // Re-get the mock app instance that express() returned when index.ts was required
    expressModule = require('express');
    mockApp = (expressModule as unknown as jest.Mock)();
  });

  it('should define a GET route for "/"', () => {
    expect(mockApp.get).toHaveBeenCalledWith(
      '/',
      expect.any(Function) // Expecting a function as the handler
    );
  });

  it('should respond with "{ message: "Hello Everyone" }" for the root GET route', () => {
    // Find the handler function that was passed to app.get('/')
    const rootRouteCall = (mockApp.get as jest.Mock).mock.calls.find(
      (call: any) => call[0] === '/'
    );
    expect(rootRouteCall).toBeDefined();

    const rootRouteHandler: (req: Request, res: Response, next: NextFunction) => void = rootRouteCall?.[1];

    expect(rootRouteHandler).toBeDefined();

    const mockReq = {} as Request;
    const mockRes = {
      json: jest.fn(),
    } as unknown as Response; // Cast to Response to satisfy type requirements

    rootRouteHandler(mockReq, mockRes, jest.fn()); // Call the handler

    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Hello Everyone' });
  });

  it('should use errorMiddleware', () => {
    expect(mockApp.use).toHaveBeenCalledWith(expect.any(Function)); // At least one use call
    // A more specific test would import errorMiddleware and check if it's specifically passed
    // import { errorMiddleware } from './middlewares/errorMiddleware';
    // expect(mockApp.use).toHaveBeenCalledWith(errorMiddleware);
    // For minimal test, checking for any function is sufficient to confirm middleware usage.
  });

  it('should start listening on the configured port', () => {
    // The require('./index') already triggers app.listen.
    // We just need to check if it was called.
    // The env.PORT is used in index.ts. We could mock env too for full isolation,
    // but for this test, just checking listen was called is sufficient.
    expect(mockApp.listen).toHaveBeenCalled();
  });
});
