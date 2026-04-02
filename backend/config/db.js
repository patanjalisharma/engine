import mongoose from "mongoose";
export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected", mongoose.connection.db.databaseName);
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
}

