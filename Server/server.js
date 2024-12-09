const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

dotenv.config();

// DataBase implementation
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB: " + err.message);
  });

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port...${PORT}`);
});
