import mongoose from "mongoose";
import { env } from "./env";

const connectDB = async () => {
  try {
    // TODO: Ensure mongoose is installed as a dependency
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
