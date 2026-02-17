import { createApp } from "./app.js";

const PORT = 3001;

createApp().listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

