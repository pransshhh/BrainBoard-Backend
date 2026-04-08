import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.string().regex(/^\d+$/).transform(Number).default("3000"),
  MONGODB_URI: z.string().url().min(1, "MongoDB URI is required"),
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
