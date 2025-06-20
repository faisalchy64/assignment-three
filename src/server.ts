import mongoose from "mongoose";
import app from "./app";

const PORT = 5000;

async function main(): Promise<void> {
  try {
    await mongoose.connect("mongodb://localhost:27017/library-management");
    console.log("Database connected successfully...");
    app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
  } catch (error) {
    console.log("Database connection failed");
  }
}

main();
