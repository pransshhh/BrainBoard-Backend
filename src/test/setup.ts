import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer;

export const connectTestDB = async (): Promise<string> => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  // We don't connect mongoose here directly, but return the URI
  // The test setup will then set process.env.MONGODB_URI and the app will connect normally
  return mongoUri;
};

export const connectMongooseToTestDB = async (mongoUri: string) => {
  await mongoose.connect(mongoUri);
  console.log('Mongoose connected to MongoDB Memory Server!');
};

export const disconnectTestDB = async () => {
  if (mongoose.connection.readyState === 1) { // Check if connected
    await mongoose.disconnect();
    console.log('Mongoose disconnected from MongoDB Memory Server.');
  }
  if (mongo) {
    await mongo.stop();
    console.log('MongoDB Memory Server stopped.');
  }
};

export const clearTestDB = async () => {
  if (mongo && mongoose.connection.readyState === 1) {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    console.log('MongoDB Memory Server cleared.');
  }
};
