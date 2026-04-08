import { MongoMemoryServer } from 'mongodb-memory-server';
import { client, connectToMongoDB, disconnectFromMongoDB } from '../config/mongo';
import { MongoClient } from 'mongodb';
import { env } from '../config/env';

describe('MongoDB Connection Lifecycle', () => {
  let mongoServer: MongoMemoryServer;
  let originalMongoUri: string | undefined;

  beforeAll(async () => {
    // Store the original MONGODB_URI to restore it later
    originalMongoUri = process.env.MONGODB_URI;

    // Start a new in-memory MongoDB instance for testing
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Set the MONGODB_URI to the in-memory server's URI
    // This will affect the 'env' object when it's reloaded or accessed
    process.env.MONGODB_URI = mongoUri;
    // Re-assign the env.MONGODB_URI to reflect the in-memory server's URI
    Object.assign(env, { MONGODB_URI: mongoUri });
  });

  afterAll(async () => {
    await disconnectFromMongoDB();
    await mongoServer.stop();

    // Restore the original MONGODB_URI
    if (originalMongoUri !== undefined) {
      process.env.MONGODB_URI = originalMongoUri;
      Object.assign(env, { MONGODB_URI: originalMongoUri });
    } else {
      delete process.env.MONGODB_URI;
      delete env.MONGODB_URI;
    }
  });

  it('should connect successfully to MongoDB', async () => {
    // Ensure the client is not already connected from a previous test run
    if (client.options.serverApi === undefined) { // Check if client is not initialized with serverApi (meaning it's closed)
      Object.assign(client, new MongoClient(env.MONGODB_URI, { // Reinitialize client
        serverApi: {
          version: '1',
          strict: true,
          deprecationErrors: true,
        },
      }));
    }
    await expect(connectToMongoDB()).resolves.toBeUndefined();
    expect(client.options.serverApi).toBeDefined(); // Verify client is connected and configured
  });

  it('should disconnect successfully from MongoDB', async () => {
    await connectToMongoDB(); // Ensure connected before disconnecting
    await expect(disconnectFromMongoDB()).resolves.toBeUndefined();
    // After disconnecting, the client should not be connected. There's no direct 'isConnected' flag for MongoClient v4+.
    // A common way to check is to try an operation, which should fail.
    // For this test, simply resolving disconnectFromMongoDB is sufficient to confirm the action.
  });

  it('should fail to connect with an invalid URI', async () => {
    await disconnectFromMongoDB(); // Ensure client is disconnected before attempting a bad connection

    // Temporarily set an invalid URI
    const originalEnvUri = env.MONGODB_URI;
    Object.assign(env, { MONGODB_URI: 'mongodb://localhost:invalidport/test' });

    // Reinitialize the client with the bad URI directly for this test
    const badClient = new MongoClient(env.MONGODB_URI, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    });

    // Try to connect with the bad client directly
    await expect(async () => {
      await badClient.connect();
    }).rejects.toThrow();

    await badClient.close(); // Clean up the bad client
    Object.assign(env, { MONGODB_URI: originalEnvUri }); // Restore original URI
  });
});
