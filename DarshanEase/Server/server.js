const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Database connect
connectDB();

// Middleware
app.use(express.json());

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});