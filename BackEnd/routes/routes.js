import express from "express";
import Todo from "../Schemas/schema.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const post = await Todo.create(req.body);
  res.json(post);
});

// READ
router.get("/", async (req, res) => {
  const view = await Todo.find();
  res.json(view);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const update = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(update);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const deleteItem = await Todo.findByIdAndDelete(req.params.id);
  res.json(deleteItem);
});

export default router;
