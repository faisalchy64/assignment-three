import mongoose from "mongoose";
import IBorrow from "../interfaces/borrowInterface";

const borrowSchema = new mongoose.Schema<IBorrow>(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Book-Id is required."],
      ref: "Book",
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
      min: [1, "Quantity must be at least 1."],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required."],
    },
  },
  { timestamps: true, versionKey: false }
);

const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);

export default Borrow;
