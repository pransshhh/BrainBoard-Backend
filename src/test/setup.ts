import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer;

export const connectTestDB = async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
  console.log('MongoDB Memory Server connected successfully!');
};

export const disconnectTestDB = async () => {
  if (mongo) {
    await mongoose.disconnect();
    await mongo.stop();
    console.log('MongoDB Memory Server disconnected.');
  }
};

export const clearTestDB = async () => {
  if (mongo) {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    console.log('MongoDB Memory Server cleared.');
  }
};
