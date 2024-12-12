import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth_route.js";

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
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port...${PORT}`);
});
