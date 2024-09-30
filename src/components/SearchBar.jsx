import React from "react";
import { TextField, Button } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = React.useState("");

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div style={{ display: "flex", margin: "20px 0" }}>
      <TextField
        label="Enter City"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
