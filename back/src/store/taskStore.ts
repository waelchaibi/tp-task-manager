import type { Task } from "../types/task.js";

let tasks: Task[] = [];

function normalizeLabel(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  return trimmed;
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function createTask(labelInput: unknown): Task | null {
  const label = normalizeLabel(labelInput);
  if (!label) return null;

  const task: Task = {
    id: Date.now(),
    label,
    isDone: false,
  };

  tasks = [...tasks, task];
  return task;
}

export function toggleTask(id: number): Task | null {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;

  const updated: Task = { ...tasks[idx], isDone: !tasks[idx].isDone };
  tasks = [...tasks.slice(0, idx), updated, ...tasks.slice(idx + 1)];
  return updated;
}

export function deleteTask(id: number): boolean {
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  return tasks.length !== before;
}

