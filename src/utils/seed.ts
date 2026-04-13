import mongoose from 'mongoose';
import User from '../models/User';
import connectDB from '../config/database';
import { env } from '../config/env';

const seedDatabase = async () => {
  await connectDB();

  try {
    // Check if an admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });

    if (!existingAdmin) {
      // Create a default admin user
      const adminUser = new User({
        username: 'admin',
        email: 'admin@example.com',
      });
      await adminUser.save();
      console.log('Default admin user created successfully.');
    } else {
      console.log('Admin user already exists. Skipping creation.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
};

seedDatabase();
