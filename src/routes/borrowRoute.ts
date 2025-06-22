import express, { Request, Response } from "express";
import { createBorrow, getAllBorrows } from "../controllers/borrowController";

const borrowRouter = express.Router();

// POST /api/borrow
borrowRouter.post("/borrow", (req: Request, res: Response) => {
  createBorrow(req, res);
});

// GET /api/borrow
borrowRouter.get("/borrow", (req: Request, res: Response) => {
  getAllBorrows(req, res);
});

export default borrowRouter;
