import cors from "cors";
import express from "express";
import { tasksRouter } from "./routes/tasksRouter.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/tasks", tasksRouter);

  return app;
}

