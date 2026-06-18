require("dotenv").config();  // 👈 MUST BE FIRST

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://team-task-manager-5th4zqy1r-rishabh-sharmas-projects-58610397.vercel.app",
    ],
    credentials: true,
  })
);app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("ERROR: Missing MONGO_URI in .env. Create a backend/.env file with your MongoDB connection string.");
  process.exit(1);
}

/* 🔥 MongoDB Connection */
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("DB connection error:", err);
    process.exit(1);
  });

/* Test Route */
app.get("/", (req, res) => {
  res.send("Server working");
});

const MONGO_STATUS = MONGO_URI ? (MONGO_URI.startsWith("mongodb") ? "valid" : MONGO_URI) : "missing";
console.log(`Starting backend with PORT=${PORT} and MONGO_URI=${MONGO_STATUS}`);