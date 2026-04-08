import { MongoMemoryServer } from 'mongodb-memory-server';
import { client as globalClient, connectToMongoDB, disconnectFromMongoDB, initializeClient } from '../config/mongo';
import { MongoClient } from 'mongodb';
import { env } from '../config/env';

describe('MongoDB Connection Lifecycle', () => {
  let mongoServer: MongoMemoryServer;
  let testClient: MongoClient;
  let originalMongoUri: string | undefined;

  beforeAll(async () => {
    // Store the original MONGODB_URI to restore it later
    originalMongoUri = process.env.MONGODB_URI;

    // Start a new in-memory MongoDB instance for testing
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Set the MONGODB_URI to the in-memory server's URI for the global client (if it's used outside of explicit testClient)
    process.env.MONGODB_URI = mongoUri;
    Object.assign(env, { MONGODB_URI: mongoUri });

    // Initialize a dedicated test client for these tests
    testClient = initializeClient(mongoUri);
  });

  afterAll(async () => {
    // Disconnect the test client
    await disconnectFromMongoDB(testClient);
    await mongoServer.stop();

    // Restore the original MONGODB_URI
    if (originalMongoUri !== undefined) {
      process.env.MONGODB_URI = originalMongoUri;
      Object.assign(env, { MONGODB_URI: originalMongoUri });
    } else {
      delete process.env.MONGODB_URI;
      delete env.MONGODB_URI;
    }
    // Ensure the global client is also disconnected if it was ever connected in tests
    await disconnectFromMongoDB(globalClient);
  });

  it('should connect successfully to MongoDB', async () => {
    await expect(connectToMongoDB(testClient)).resolves.toBeUndefined();
    expect(testClient.options.serverApi).toBeDefined();
  });

  it('should disconnect successfully from MongoDB', async () => {
    await connectToMongoDB(testClient); // Ensure connected before disconnecting
    await expect(disconnectFromMongoDB(testClient)).resolves.toBeUndefined();
  });

  it('should fail to connect with an invalid URI', async () => {
    await disconnectFromMongoDB(testClient); // Ensure client is disconnected before attempting a bad connection

    // Create a new client specifically for this invalid URI test
    const invalidUriClient = initializeClient('mongodb://localhost:invalidport/test');

    await expect(async () => {
      await connectToMongoDB(invalidUriClient);
    }).rejects.toThrow();

    await invalidUriClient.close(); // Clean up the bad client
  });
});
