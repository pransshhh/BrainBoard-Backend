import express, { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { env } from "./config";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world" });
});

app.use(errorMiddleware);

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("MongoDB connected");
    app.listen(env.PORT, () => {
      console.log(`Listening to port ${env.PORT} in ${env.NODE_ENV} mode `);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();
