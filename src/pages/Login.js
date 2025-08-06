import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      if (data.role === "admin") navigate("/admin");
      else navigate("/user");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Password" type="password" name="password" onChange={handleChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Login</Button>
        </form>
      </Box>
    </Container>
  );
}
