const express = require("express");
const Task = require("../models/Task");
const authenticate = require("../middleware/auth");

const router = express.Router();

// Get all tasks for the user
router.get("/", authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.userId }).populate("assignedTo", "name email").populate("createdBy", "name email");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

// Create a task
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;
    const task = new Task({
      title,
      description,
      status: status || "pending",
      assignedTo: assignedTo || req.userId,
      createdBy: req.userId
    });
    await task.save();
    await task.populate("assignedTo", "name email");
    await task.populate("createdBy", "name email");
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

// Update a task
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, $or: [{ assignedTo: req.userId }, { createdBy: req.userId }] },
      { title, description, status, updatedAt: Date.now() },
      { new: true }
    ).populate("assignedTo", "name email").populate("createdBy", "name email");
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

// Delete a task
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      $or: [{ assignedTo: req.userId }, { createdBy: req.userId }]
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.json({ message: "Task deleted." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
