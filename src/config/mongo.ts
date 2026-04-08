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
  } catch (error: any) { // Explicitly type error as 'any' for easier property access
    let errorMessage = "Error connecting to MongoDB";
    if (error.name === "MongoNetworkError") {
      errorMessage = "MongoDB Network Error: Could not reach MongoDB server.";
      if (error.message.includes("timed out")) {
        errorMessage = "MongoDB Connection Timeout: The server took too long to respond.";
      } else if (error.message.includes("ECONNREFUSED")) {
        errorMessage = "MongoDB Connection Refused: The server actively refused the connection.";
      }
    } else if (error.name === "MongoServerError" && error.code === 8000) { // Common code for authentication errors
      errorMessage = "MongoDB Authentication Error: Invalid credentials or authentication failed.";
    } else if (error.name === "MongooseServerSelectionError") { // For Mongoose specific errors if it were used
      errorMessage = "MongoDB Server Selection Error: No primary or viable replica set members found.";
    }
    console.error(`${errorMessage}:`, error);
    throw error; // Re-throw error after logging for retry mechanism or process exit
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
        `MongoDB connection failed on attempt ${i + 1}/${retries}. Retrying in ${delay / 1000} seconds...`,
        error
      );
      await new Promise((res) => setTimeout(res, delay));
      delay *= 2; // Exponential backoff
    }
  }
  console.error(
    `Failed to connect to MongoDB after ${retries} attempts.`
  );
  throw new Error("Failed to connect to MongoDB after multiple retries.");
}

async function disconnectFromMongoDB(mongoClient: MongoClient = client) {
  if (mongoClient) {
    await mongoClient.close();
    console.log("Disconnected from MongoDB.");
  }
}

export { client, connectToMongoDB, disconnectFromMongoDB, initializeClient, connectWithRetry };
