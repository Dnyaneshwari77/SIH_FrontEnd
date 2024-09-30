import React from "react";
import {
  Box,
  Typography,
  Link,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        padding: 4,
        marginTop: 4,
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Link href="#" color="inherit" underline="hover">
            Home
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            About Us
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Services
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Contact Us
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">
            123 Health St, Medical City, MC 12345
          </Typography>
          <Typography variant="body2">Phone: (123) 456-7890</Typography>
          <Typography variant="body2">Email: info@healthcare.com</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <IconButton
              color="inherit"
              aria-label="Facebook"
              href="https://facebook.com"
              target="_blank"
            >
              <Facebook />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Twitter"
              href="https://twitter.com"
              target="_blank"
            >
              <Twitter />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Instagram"
              href="https://instagram.com"
              target="_blank"
            >
              <Instagram />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="LinkedIn"
              href="https://linkedin.com"
              target="_blank"
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ margin: "20px 0", backgroundColor: "#fff" }} />
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} HealthCare. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
