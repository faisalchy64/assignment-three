import express, { Application, Request, Response } from "express";

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({ status: 200, message: "Library Management Application." });
});

export default app;
