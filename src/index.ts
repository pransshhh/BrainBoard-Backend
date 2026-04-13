import express, { Request, Response, NextFunction } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { env, connectDB } from "./config";
import { UserRepository } from "./repositories/userRepository";
import { IUser } from "./models/User";

const app = express();
app.use(express.json());

const userRepository = new UserRepository();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world" });
});

// New route to create a user
app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await userRepository.create(req.body as IUser);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// New route to get all users
app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userRepository.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

app.use(errorMiddleware);

const startServer = async () => {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`Listening to port ${env.PORT} in ${env.NODE_ENV} mode`);
  });
};

startServer();
