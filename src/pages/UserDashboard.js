import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  LinearProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { motion } from "framer-motion";

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tasks/mytasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
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
      fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error(error);
    }
  };

  const getProgress = (status) => {
    if (status === "Completed") return 100;
    if (status === "In Progress") return 60;
    return 20; // Pending
  };

  const getStatusColor = (status) => {
    if (status === "Completed") return "success";
    if (status === "In Progress") return "info";
    return "warning";
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>
      <Grid container spacing={2}>
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

                  <Chip
                    label={task.status}
                    color={getStatusColor(task.status)}
                    sx={{ mt: 2 }}
                  />

                  <LinearProgress
                    variant="determinate"
                    value={getProgress(task.status)}
                    sx={{ mt: 2, height: 8, borderRadius: 5 }}
                  />

                  {task.status !== "Completed" && (
                    <Tooltip title="Mark as Completed">
                      <IconButton
                        color="success"
                        onClick={() => updateTaskStatus(task._id)}
                        sx={{ mt: 1 }}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>
                  )}

                  {task.status === "Pending" && (
                    <Tooltip title="Pending Task">
                      <AccessTimeIcon color="warning" sx={{ mt: 1 }} />
                    </Tooltip>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserDashboard;
