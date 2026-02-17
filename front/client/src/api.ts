interface Task {
  id: string;
  label: string;
  done: boolean;
}

const API_BASE = '/api';

export async function getAllTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE}/tasks`);
  if (!res.ok) throw new Error(`getAllTasks failed: ${res.status}`);
  return res.json();
}

export async function createTask(label: string): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ label }),
  });
  if (!res.ok) throw new Error(`createTask failed: ${res.status}`);
  return res.json();
}

export async function toggleTask(id: string): Promise<Task> {
  // Assumes backend exposes a toggle endpoint; adjust if your API differs
  const res = await fetch(`${API_BASE}/tasks/${id}/toggle`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error(`toggleTask failed: ${res.status}`);
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`deleteTask failed: ${res.status}`);
}

export default { getAllTasks, createTask, toggleTask, deleteTask };
