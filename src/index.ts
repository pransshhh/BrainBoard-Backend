import express, { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { env } from "./config";
import { connectToMongoDB, client, disconnectFromMongoDB } from "./config/mongo";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world" });
});

// Health check endpoint
app.get("/health", async (req: Request, res: Response) => {
  try {
    await client.db("admin").command({ ping: 1 });
    res.status(200).json({ status: "UP", database: "connected" });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({ status: "DOWN", database: "disconnected", error: error.message });
  }
});

app.use(errorMiddleware);

let server; // Declare server variable here to be accessible for shutdown

async function startServer() {
  try {
    await connectToMongoDB();
    server = app.listen(env.PORT, () => {
      console.log(`Listening to port ${env.PORT} in ${env.NODE_ENV} mode `);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB, server not started:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
}

// Graceful shutdown function
async function gracefulShutdown(signal: string) {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  // Disconnect from MongoDB
  await disconnectFromMongoDB();

  // Close the server to stop accepting new connections
  if (server) {
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

// Register for OS signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

startServer();
