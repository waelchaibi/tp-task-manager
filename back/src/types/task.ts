export interface Task {
  id: number; // generated server-side (ex: Date.now())
  label: string;
  isDone: boolean;
}

