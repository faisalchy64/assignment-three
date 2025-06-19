import mongoose from "mongoose";
import app from "./app";

const PORT = 5000;

async function main(): Promise<void> {
  try {
    await mongoose.connect(
      "mongodb+srv://faisalchy64:ZzW1ZTkvYdF91WfC@library-management.fvt16an.mongodb.net/?retryWrites=true&w=majority&appName=Library-Management"
    );
    console.log("Database connected successfully...");
    app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
  } catch (error) {
    console.log("Database connection failed");
  }
}

main();
