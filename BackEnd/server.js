import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Atlas Connected Successfully!");
    console.log("📊 Database: todoapp");
  })
  .catch((err) => {
    console.error("❌ MongoDB Atlas Connection Error:", err.message);
    console.error("Check your connection string in .env file");
    process.exit(1);
  });

// Todo Schema & Model
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

// ==================== API ROUTES ====================

// GET - Fetch all todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    console.log(`📋 Fetched ${todos.length} todos from MongoDB Atlas`);
    res.json(todos);
  } catch (error) {
    console.error("❌ Error fetching todos:", error);
    res.status(500).json({ message: error.message });
  }
});

// POST - Create new todo
app.post("/api/todos", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = new Todo({ title: title.trim() });
    const savedTodo = await todo.save();

    console.log(`✅ Todo saved to MongoDB Atlas: "${savedTodo.title}"`);
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error("❌ Error creating todo:", error);
    res.status(400).json({ message: error.message });
  }
});

// PUT - Update todo
app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (completed !== undefined) updateData.completed = completed;

    const todo = await Todo.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    console.log(`✏️ Todo updated in MongoDB Atlas: "${todo.title}"`);
    res.json(todo);
  } catch (error) {
    console.error("❌ Error updating todo:", error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    console.log(`🗑️ Todo deleted from MongoDB Atlas: "${todo.title}"`);
    res.json({ message: "Todo deleted successfully", id });
  } catch (error) {
    console.error("❌ Error deleting todo:", error);
    res.status(500).json({ message: error.message });
  }
});

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Todo API is running!",
    database:
      mongoose.connection.readyState === 1
        ? "Connected ✅"
        : "Disconnected ❌",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("🌐 Using MongoDB Atlas (Cloud Database)");
});
