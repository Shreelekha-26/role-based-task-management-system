import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]); // 👈 store list of users
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    assignedTo: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/tasks", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpen(false);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTaskStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/tasks/${id}`,
        { status: "Completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Completed") return "success";
    if (status === "In Progress") return "info";
    return "warning";
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Create New Task
      </Button>

      {/* Create Task Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="dense"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Description"
            margin="dense"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Deadline"
            type="date"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
          />

          {/* User dropdown instead of User ID */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Assign To</InputLabel>
            <Select
              value={newTask.assignedTo}
              onChange={(e) =>
                setNewTask({ ...newTask, assignedTo: e.target.value })
              }
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" sx={{ mt: 2 }} onClick={handleCreateTask}>
            Save Task
          </Button>
        </DialogContent>
      </Dialog>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {tasks.map((task) => (
          <Grid item xs={12} md={6} lg={4} key={task._id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                sx={{
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {task.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Assigned To: {task.assignedTo?.name || "Unknown"}
                  </Typography>

                  <Chip
                    label={task.status}
                    color={getStatusColor(task.status)}
                    sx={{ mt: 2 }}
                  />

                  <div style={{ marginTop: "10px" }}>
                    <Tooltip title="Mark as Completed">
                      <IconButton
                        color="success"
                        onClick={() => updateTaskStatus(task._id)}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit Task">
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Task">
                      <IconButton
                        color="error"
                        onClick={() => deleteTask(task._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AdminDashboard;
