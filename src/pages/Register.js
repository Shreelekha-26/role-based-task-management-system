import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, MenuItem } from "@mui/material";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h5">Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Name" name="name" onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Password" type="password" name="password" onChange={handleChange} />
          <TextField select fullWidth margin="normal" label="Role" name="role" value={form.role} onChange={handleChange}>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Register</Button>
        </form>
      </Box>
    </Container>
  );
}
