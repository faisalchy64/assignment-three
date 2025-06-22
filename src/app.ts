import express, { Application, Request, Response } from "express";
import bookRouter from "./routes/bookRoute";
import borrowRouter from "./routes/borrowRoute";

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({ status: 200, message: "Library Management Application." });
});

app.use("/api", bookRouter);

app.use("/api", borrowRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send({
    message: "Resource not found.",
    success: false,
    error: {
      name: "NotFoundError",
      errors: {
        name: "NotFoundError",
        message: "Resource not found.",
      },
    },
  });
});

export default app;
