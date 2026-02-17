import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  toggleTask,
} from "../store/taskStore.js";

function parseId(idParam: string): number | null {
  const id = Number(idParam);
  if (!Number.isFinite(id)) return null;
  return id;
}

export const tasksRouter = Router();

tasksRouter.get("/", (_req, res) => {
  return res.json(getAllTasks());
});

tasksRouter.post("/", (req, res) => {
  const created = createTask(req.body?.label);
  if (!created) {
    return res.status(400).json({ error: "Invalid label" });
  }
  return res.status(201).json(created);
});

tasksRouter.put("/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: "Invalid id" });

  const updated = toggleTask(id);
  if (!updated) return res.status(404).json({ error: "Task not found" });

  return res.json(updated);
});

tasksRouter.delete("/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: "Invalid id" });

  const deleted = deleteTask(id);
  if (!deleted) return res.status(404).json({ error: "Task not found" });

  return res.json({ ok: true, deletedId: id });
});

