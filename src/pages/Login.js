import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await login(credentials.email, credentials.password);
      // Check for profile completeness
      if (!responseData.patient.profileComplete) {
        toast.success("Login successful! Please complete your profile.");
        navigate("/complete-profile");
      } else {
        toast.success("Login successful! Welcome back.");
        navigate("/hospital-list");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials."); // Show error toast
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            onChange={handleChange}
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            onChange={handleChange}
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
