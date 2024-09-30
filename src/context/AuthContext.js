import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("No user");
  // const navigate = useNavigate();

  const signup = async (userData) => {
    try {
      const response = await axios.post(
        "https://sih-server-5ao9.onrender.com/api/signup",
        userData
      );
      setUser(response.data.patient);
      toast.success("Signup successful!"); // Notify on successful signup

      return response.data;
    } catch (error) {
      console.error("Signup error:", error.response);
      toast.error(error.response?.data?.message || "Signup failed!"); // Notify on error
      throw error.response;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://sih-server-5ao9.onrender.com/api/login",
        {
          email,
          password,
        }
      );
      setUser(response.data.patient);
      toast.success("Login successful!"); // Notify on successful login

      return response.data;
    } catch (error) {
      console.error("Login error:", error.response.data);
      toast.error(error.response?.data?.message || "Login failed!"); // Notify on error
      throw error.response.data;
    }
  };

  const updateProfile = async (userId, profileData) => {
    try {
      const response = await axios.patch(
        `https://sih-server-5ao9.onrender.com/api/updateProfile/${userId}`, // Update with your API endpoint
        profileData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're using JWT for auth
          },
        }
      );

      setUser(response.data); // Update the current user if necessary
      toast.success("Profile updated successfully!"); // Notify on successful profile update
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Profile update failed!"); // Notify on error
      throw error; // Rethrow error to be handled in the component
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully!"); // Notify on logout
  };

  return (
    <AuthContext.Provider
      value={{ currentUser: user, signup, login, updateProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
