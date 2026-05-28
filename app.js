const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SIT753 Jenkins DevOps Pipeline App is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "sit753-devops-app" });
});

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Shubham" },
    { id: 2, name: "Deakin Student" }
  ]);
});

module.exports = app;