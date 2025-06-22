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
      min: [0, "Copies must be a positive number."],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

bookSchema.methods.checkAvailability = function (quantity: number): void {
  this.copies -= quantity;

  if (this.copies === 0) {
    this.available = false;
  }
};

bookSchema.pre("save", function (next) {
  if (this.copies > 0 && this.available === false) {
    this.available = true;
  }

  next();
});

bookSchema.post("save", async function (doc) {
  console.log(`Book copies updated: ${doc.title}, Copies left: ${doc.copies}`);
});

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
