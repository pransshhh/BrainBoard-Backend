import express, { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { env } from "./config";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello Everyone" });
});

app.use(errorMiddleware);

app.listen(env.PORT, () => {
  console.log(`Listening to port ${env.PORT} in ${env.NODE_ENV} mode `);
});
