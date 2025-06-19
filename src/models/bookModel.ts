import mongoose from "mongoose";
import IBook from "../interfaces/bookInterface";

const bookSchema = new mongoose.Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    author: {
      type: String,
      required: [true, "Author is required."],
    },
    genre: {
      type: String,
      required: [true, "Genre is required."],
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required."],
    },
    description: {
      type: String,
      default: "",
    },
    copies: {
      type: Number,
      required: [true, "Copies is required."],
      min: [1, "Copies must be at least 1."],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
