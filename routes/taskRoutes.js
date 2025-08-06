const express = require("express");
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Create task (admin only)
router.post("/", protect, admin, async (req, res) => {
  const { title, description, deadline, assignedTo } = req.body;

  const task = await Task.create({
    title,
    description,
    deadline,
    assignedTo
  });

  res.status(201).json(task);
});

// Get all tasks (admin only)
router.get("/", protect, admin, async (req, res) => {
  const tasks = await Task.find().populate("assignedTo", "name email");
  res.json(tasks);
});

// Get tasks for logged-in user
router.get("/mytasks", protect, async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id });
  res.json(tasks);
});

// Update task status (user only for their own tasks)
router.patch("/:id", protect, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.assignedTo.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  task.status = req.body.status || task.status;
  await task.save();

  res.json(task);
});

  // Delete task (admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
