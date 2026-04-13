import UserModel from "./User";
import mongoose from "mongoose";

describe("User Model", () => {
  // In a real scenario, you might connect to an in-memory database or a test database
  // For unit testing the schema definition, we can inspect the schema directly.

  it("should have name and email fields defined as required", () => {
    const schema = UserModel.schema;

    // Check 'name' field
    const namePath = schema.path("name") as mongoose.SchemaType;
    expect(namePath).toBeDefined();
    expect(namePath.isRequired).toBe(true);
    expect(namePath.instance).toBe("String");

    // Check 'email' field
    const emailPath = schema.path("email") as mongoose.SchemaType;
    expect(emailPath).toBeDefined();
    expect(emailPath.isRequired).toBe(true);
    expect(emailPath.instance).toBe("String");
  });

  it("should have a unique index on the email field", () => {
    const schema = UserModel.schema;
    const emailPath = schema.path("email") as mongoose.SchemaType;
    expect(emailPath.options.unique).toBe(true);
  });

  it("should create a new user instance correctly", () => {
    const user = new UserModel({ name: "Test User", email: "test@example.com" });
    expect(user).toBeDefined();
    expect(user.name).toBe("Test User");
    expect(user.email).toBe("test@example.com");
  });
});
