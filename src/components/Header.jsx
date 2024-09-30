import React from "react";
import { AppBar, Toolbar, Typography, Button, List } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Patient Portal
          </Typography>

          <List>
            <Link to="/">Home</Link>
            <Link to="/hospital-list">Hospital List</Link>
            <Link to="/conatct-us">Contact Us</Link>
          </List>

          <Button color="inherit">LogOut</Button>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Header;
