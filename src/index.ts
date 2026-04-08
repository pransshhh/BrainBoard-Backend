import express, { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { env } from "./config";
import { connectToMongoDB, client } from "./config/mongo";

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

async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(env.PORT, () => {
      console.log(`Listening to port ${env.PORT} in ${env.NODE_ENV} mode `);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB, server not started:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
}

startServer();
