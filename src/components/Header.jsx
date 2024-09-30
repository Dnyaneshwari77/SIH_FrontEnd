import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming AuthContext is in context folder

const Header = () => {
  const { currentUser, logout } = useAuth(); // Get the current user and logout function from context
  const navigate = useNavigate();

  console.log("Current user", currentUser);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home after logout
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            MediSync
          </Typography>

          {/* If no user is logged in, show Sign Up and Login buttons */}
          {!currentUser || currentUser === "No user" ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <List
                style={{ display: "flex", gap: "15px", marginRight: "auto" }}
              >
                <ListItem
                  component={Link}
                  to="/"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Home
                </ListItem>
                <ListItem
                  component={Link}
                  to="/hospital-list"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Hospital List
                </ListItem>
                {/* <ListItem
                  component={Link}
                  to="/contact-us"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Contact Us
                </ListItem> */}
              </List>
              {/* When user is logged in, show Logout */}
              <Typography variant="body1" style={{ marginRight: "20px" }}>
                Welcome, {currentUser.firstName + " " + currentUser.lastName}
                {/* Adjust to use the correct user property */}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Header;
