import { Request, Response } from "express";
import mongoose from "mongoose";
import Book from "../models/bookModel";
import Borrow from "../models/borrowModel";

export const createBorrow = async (req: Request, res: Response) => {
  try {
    if (
      typeof req.body.book === "string" &&
      mongoose.Types.ObjectId.isValid(req.body.book) &&
      typeof req.body.quantity === "number" &&
      typeof req.body.dueDate === "string"
    ) {
      const book = await Book.findById(req.body.book);

      if (book && book.copies - req.body.quantity >= 0) {
        book.checkAvailability(req.body.quantity);
        const data = await Borrow.create(req.body);
        await book.save();

        return res.status(201).send({
          success: true,
          message: "Book borrowed successfully",
          data,
        });
      } else if (book === null) {
        return res.status(404).send({
          message: "Book not found.",
          success: false,
          error: {
            name: "NotFoundError",
            errors: { name: "NotFoundError", message: "Book not found." },
          },
        });
      } else {
        return res.status(400).send({
          message: "Not enough copies available.",
          success: false,
          error: {
            name: "NotEnoughCopiesError",
            errors: {
              name: "NotEnoughCopiesError",
              message: "Not enough copies available.",
            },
          },
        });
      }
    }

    res.status(400).send({
      message: "Validation failed.",
      success: false,
      error: {
        name: "ValidationError",
        errors: {
          name: "ValidationError",
          message:
            "Book must be a valid ObjectId, quantity must be a positive number, and due date must be a string.",
        },
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const { name, errors } = error;

      return res.status(400).send({
        message: "Validation failed",
        success: false,
        error: { name, errors },
      });
    }

    if (error instanceof Error) {
      const { message, name } = error;

      return res.status(500).send({
        message: message || "Something went wrong.",
        success: false,
        error: {
          name,
          errors: { name, message: message || "Something went wrong." },
        },
      });
    }
  }
};

export const getAllBorrows = async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
      { $match: {} },
      {
        $lookup: {
          from: "books",
          localField: "book",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $group: {
          _id: "$bookDetails.title",
          book: {
            $first: { title: "$bookDetails.title", isbn: "$bookDetails.isbn" },
          },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          "book.title": 1,
          "book.isbn": 1,
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).send({
      success: true,
      message: "Borrowed books summary retrieved successfully.",
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      const { message, name } = error;

      return res.status(500).send({
        message: message || "Something went wrong.",
        success: false,
        error: {
          name,
          errors: { name, message: message || "Something went wrong." },
        },
      });
    }
  }
};
