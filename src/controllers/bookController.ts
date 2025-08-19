import { Request, Response } from "express";
import mongoose from "mongoose";
import Book from "../models/bookModel";

export const createBook = async (req: Request, res: Response) => {
  try {
    const data = await Book.create(req.body);

    res.status(201).send({
      success: true,
      message: "Book created successfully.",
      data,
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

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = "createdAt", sort, limit = 10 } = req.query;
    const sortOrder = sort === "desc" ? -1 : 1;
    const query: any = {};

    if (filter) {
      query.genre = { $eq: filter };
    }

    const data = await Book.find(query).sort({
      [sortBy as string]: sortOrder,
    });

    res.status(200).send({
      success: true,
      message: "Books retrieved successfully.",
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

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const data = await Book.findById(bookId);

    if (data) {
      return res.status(200).send({
        success: true,
        message: "Book retrieved successfully.",
        data,
      });
    }

    res.status(404).send({
      message: "Book not found.",
      success: false,
      error: {
        name: "NotFoundError",
        errors: { name: "NotFoundError", message: "Book not found." },
      },
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

export const updateBook = async (req: Request, res: Response) => {
  try {
    if (typeof req.body.copies === "number") {
      const book = await Book.findById(req.params.bookId);
      const data = await Book.findByIdAndUpdate(
        req.params.bookId,
        {
          ...req.body,
          copies: req.body.copies > 0 ? book?.copies + req.body.copies : 0,
          available: req.body.copies > 0 ? true : false,
        },
        {
          new: true,
        }
      );

      if (data) {
        return res.status(200).send({
          success: true,
          message: "Book updated successfully.",
          data,
        });
      }

      return res.status(404).send({
        message: "Book not found.",
        success: false,
        error: {
          name: "NotFoundError",
          errors: { name: "NotFoundError", message: "Book not found." },
        },
      });
    }

    res.status(400).send({
      message: "Validation failed.",
      success: false,
      error: {
        name: "ValidationError",
        errors: {
          name: "ValidationError",
          message: "Copies must be a positive number.",
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

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const data = await Book.findByIdAndDelete(bookId);

    if (data) {
      return res.status(200).send({
        success: true,
        message: "Book deleted successfully.",
        data: null,
      });
    }

    res.status(404).send({
      message: "Book not found.",
      success: false,
      error: {
        name: "NotFoundError",
        errors: { name: "NotFoundError", message: "Book not found." },
      },
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
