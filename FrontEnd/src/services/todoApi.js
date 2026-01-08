const API_URL = "http://localhost:5000/api/todos";

// Get all todos
export const getAllTasks = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};


// Create todo
export const createTask = async (text) => {
  const res = await fetch("http://localhost:5000/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })   // <-- must match backend
  });

  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
};


// Update todo
export const updateTask = async (id, updates) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
};

// Delete todo
export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
};
