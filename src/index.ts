import express, { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { env } from "./config";
import connectDB from "./config/db";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world" });
});

app.use(errorMiddleware);

connectDB();

app.listen(env.PORT, () => {
  console.log(`Listening to port ${env.PORT} in ${env.NODE_ENV} mode `);
});
