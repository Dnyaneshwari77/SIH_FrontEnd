import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    const responseData = await login(credentials.email, credentials.password);
    if (!responseData.patient.profileComplete) {
      navigate("/complete-profile");
    } else {
      navigate("/hospital-list");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField onChange={handleChange} label="Email" name="email" />
        <TextField
          onChange={handleChange}
          label="Password"
          name="password"
          type="password"
        />
        <Button type="submit">Login</Button>
      </form>
    </Container>
  );
};

export default Login;
