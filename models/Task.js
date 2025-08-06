const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  status: { type: String, enum: ["Pending", "In Progress", "Done"], default: "Pending" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Task", taskSchema);
