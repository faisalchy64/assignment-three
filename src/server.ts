import mongoose from "mongoose";
import app from "./app";

const PORT = 5000;

async function main(): Promise<void> {
  try {
    await mongoose.connect(
      "mongodb+srv://faisalchy64:1o45Le48IrGB7bfE@library-management-syst.xnoa4rr.mongodb.net/library?retryWrites=true&w=majority&appName=Library-Management-System"
    );
    console.log("Database connected successfully...");
    app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
  } catch (error) {
    console.log("Database connection failed");
  }
}

main();
