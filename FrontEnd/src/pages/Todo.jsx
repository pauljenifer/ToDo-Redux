import { useEffect, useState } from "react";
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/todoApi";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load todos on page load
  useEffect(() => {
    loadTodos();
  }, []);
  

  const loadTodos = async () => {
    try {
      const data = await getAllTasks();
      setTodos(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // Add todo
const addTodo = async () => {
  if (!task.trim()) return;

  try {
    const newTodo = await createTask(task);   // <-- sends { title: task }
    setTodos([...todos, newTodo]);
    setTask("");
  } catch (err) {
    console.error(err);      // <-- check this in browser console
    alert("Failed to add task");
  }
};


  // Toggle complete
  const toggleTodo = async (id, completed) => {
    try {
      const updated = await updateTask(id, { completed: !completed });
      setTodos(todos.map(t => (t._id === id ? updated : t)));
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  };

  // Delete todo
  const removeTodo = async (id) => {
    try {
      await deleteTask(id);
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Todo List</h2>

      <input
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.length === 0 && <p>No tasks found</p>}

        {todos.map(t => (
          <li key={t._id}>
            <span
              onClick={() => toggleTodo(t._id, t.completed)}
              style={{
                cursor: "pointer",
                textDecoration: t.completed ? "line-through" : "none",
              }}
            >
              {t.text}
            </span>
            <button onClick={() => removeTodo(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
