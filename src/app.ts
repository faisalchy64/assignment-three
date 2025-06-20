import express, { Application, Request, Response } from "express";
import bookRouter from "./routes/bookRoute";

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({ status: 200, message: "Library Management Application." });
});

app.use("/api", bookRouter);

export default app;
