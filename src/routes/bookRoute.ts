import express, { Request, Response } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController";

const bookRouter = express.Router();

// POST /api/books
bookRouter.post("/books", (req: Request, res: Response) => {
  createBook(req, res);
});

// GET /api/books
bookRouter.get("/books", (req: Request, res: Response) => {
  getAllBooks(req, res);
});

// GET /api/books/:bookId
bookRouter.get("/books/:bookId", (req: Request, res: Response) => {
  getBookById(req, res);
});

// PUT /api/books/:bookId
bookRouter.patch("/books/:bookId", (req: Request, res: Response) => {
  updateBook(req, res);
});

// DELETE /api/books/:bookId
bookRouter.delete("/books/:bookId", (req: Request, res: Response) => {
  deleteBook(req, res);
});

export default bookRouter;
