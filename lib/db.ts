import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/taskflow";

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable");
}

let isConnected = false; // Track the connection status

export async function connectToDatabase() {
  if (isConnected) {
    console.log("✅ Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    isConnected = true;
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Database connection failed.");
  }
}
