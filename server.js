
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();

app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("database.db");

db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, task TEXT)");

app.post("/add-task", (req, res) => {
  const task = req.body.task;
  db.run("INSERT INTO tasks (task) VALUES (?)", [task]);
  res.send({ message: "Task added successfully" });
});

app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    res.send(rows);
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
