const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const taskRoutes = require("./routes/taskRoutes");

console.log("TASK ROUTES LOADED:", taskRoutes);

const app = express();
app.use(express.json());

app.use("/tasks", taskRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "Server is working" });
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
