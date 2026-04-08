import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "./env";

let client: MongoClient;

function initializeClient(mongoUri: string): MongoClient {
  return new MongoClient(mongoUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
}

// Initialize the global client with the environment URI
client = initializeClient(env.MONGODB_URI);

async function connectToMongoDB(mongoClient: MongoClient = client) {
  try {
    await mongoClient.connect();
    await mongoClient.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Throw error instead of exiting process
  }
}

async function connectWithRetry(
  mongoClient: MongoClient = client,
  retries: number = 5,
  delay: number = 1000 // initial delay in ms
) {
  for (let i = 0; i < retries; i++) {
    try {
      await connectToMongoDB(mongoClient);
      return; // Connection successful, exit
    } catch (error) {
      console.error(
        `MongoDB connection failed. Retrying in ${delay / 1000} seconds...`,
        error
      );
      await new Promise((res) => setTimeout(res, delay));
      delay *= 2; // Exponential backoff
    }
  }
  console.error(
    `Failed to connect to MongoDB after ${retries} attempts.`
  );
  throw new Error("Failed to connect to MongoDB");
}

async function disconnectFromMongoDB(mongoClient: MongoClient = client) {
  if (mongoClient) {
    await mongoClient.close();
    console.log("Disconnected from MongoDB.");
  }
}

export { client, connectToMongoDB, disconnectFromMongoDB, initializeClient, connectWithRetry };
