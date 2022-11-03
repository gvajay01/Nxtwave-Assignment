import React from "react";
import { TextField, Typography } from "@mui/material";

const Input = ({ input, value, handleChange }) => {
  return (
    <div style={{ margin: "10px" }}>
      <Typography
        sx={{ color: "#7E858E", fontSize: "12px", textTransform: "uppercase" }}
      >
        {input.label}
      </Typography>
      <TextField
        sx={{ width: "320px", input: { height: "10px" } }}
        multiline={input.multiline}
        rows={2}
        name={input.value}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
