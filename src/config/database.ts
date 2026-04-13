import mongoose from "mongoose";
import { env } from "./env";
// @ts-ignore
import mongooseDelete from "mongoose-delete"; // Assuming mongoose-delete is installed

const connectDB = async (retries = 5) => {
  while (retries > 0) {
    try {
      await mongoose.connect(env.MONGODB_URI);
      console.log("MongoDB connected successfully!");

      // Configure Mongoose global plugins
      // For example, soft delete functionality
      mongoose.plugin(mongooseDelete, { overrideMethods: 'all' });

      return;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      retries--;
      console.log(`Retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000)); // Wait 5 seconds before retrying
    }
  }
  console.error("MongoDB connection failed after multiple retries.");
  process.exit(1);
};

export default connectDB;
