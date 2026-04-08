import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.string().regex(/^\d+$/).transform(Number).default("3000"),
  MONGO_URI: z.string().url({
    message: "Invalid MONGO_URI. Must be a valid connection string."
  }),
  MONGODB_URI: z.string().url({
    message: "Invalid MONGODB_URI. Must be a valid connection string."
  }),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error(
    "❌ Invalid environment variables!",
    JSON.stringify(error.format(), null, 2)
  );
  process.exit(1);
}

export const env = data;
