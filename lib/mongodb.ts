// lib/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

export async function connectToDatabase() {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('MongoDB connected');
      return mongoose.connection;
    } catch (error) {
      console.error('MongoDB connection error:', error);
    //   throw error;
    }
}

export default connectToDatabase;

// Add a function to seed initial data
// export async function seedInitialData() {
//   const User = mongoose.models.User || require('../models/User').default;
  
//   try {
//     // Check if our hardcoded user exists
//     const existingUser = await User.findOne({ email: 'intern@dacoid.com' });
    
//     if (!existingUser) {
//       // Create the hardcoded user if it doesn't exist
//       await User.create({
//         email: 'intern@dacoid.com',
//         password: 'Test123', // Will be hashed by the pre-save hook
//         name: 'Test Intern'
//       });
//       console.log('Initial user seeded successfully');
//     }
//   } catch (error) {
//     console.error('Error seeding initial data:', error);
//   }
// }