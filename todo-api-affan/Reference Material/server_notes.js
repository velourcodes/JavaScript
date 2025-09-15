// Minimal, explicit backend using mysql2 and Express (callback style).
const express = require("express"); // Express framework
const mysql = require("mysql2");   // mysql2 driver (supports callbacks + promises)
require("dotenv").config();           // Loads DB credentials from .env

const app = express();
app.use(express.json());  // middleware: parses incoming JSON request body and sets req.body
const db = mysql.createConnection(
{
  host: process.env.DB_HOST,
  user: process.env.DB_USER,     
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME, 
});

// connect() accepts one callback: function(err) { ... }
// - err is the error object if connection fails, otherwise null/undefined
db.connect((err) => 
{
  if (err) 
  {
    console.error("DB connection error:", err);
    throw err;
  }
  console.log("Database Connected Successfully!");
});

// GET /todos
// - Fetch all todos from DB and return them as JSON array
app.get("/todos", (req, res) => 
{
  const sql = "SELECT * FROM todos"; // SELECT query string (no placeholders)
// db.query(sql, callback)
 // callback signature: (err, results, fields) => { ... }
  db.query(sql, (err, results, fields) => 
  {
    // err: error object if query failed
    // results: for SELECT -> array of row objects; for other queries -> OkPacket
    // fields: metadata about columns (rarely used)
    if (err) 
    {
      console.error("Error running SELECT:", err);
      return res.status(500).json({ error: "Database error" });
    }
    // results is an array like: [{id:1, title:"Buy milk", completed:0, created_at: '...' }, ...]
    return res.json(results);
  });
});

// POST /todos
// - Create a new todo. Expects JSON body: { "title": "some text" }
app.post("/todos", (req, res) => 
{
  // express.json() ensured req.body is already a JS object
  const title = req.body.title; // origin: client sends JSON; here we read the title
  if (!title || !title.trim()) 
  {
    // basic validation: no empty titles
    return res.status(400).json({ error: "title is required" });
  }
  // parameterized query: '?' is a placeholder for values
  const sql = "INSERT INTO todos (title) VALUES (?)";

  // db.query(sql, valuesArray, callback)
  // valuesArray maps each '?' in the SQL to the corresponding value in order
  db.query(sql, [title], (err, results, fields) => 
  {
    // For INSERT, results is an OkPacket object (not an array)
    // Example OkPacket properties: { affectedRows:1, insertId: 42, warningStatus:0, ... }
    if (err) 
    {
      console.error("Error running INSERT:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Return the created resource (201 Created)
    return res.status(201).json(
    {
      id: results.insertId,  // the new row's auto-increment id (number)
      title,
      completed: false
    });
  });
});

// PUT /todos/:id
// - Update fields of a todo (here we only toggle completed)
// - Expects JSON body: { "completed": true }
// - :id is a route parameter accessible via req.params.id
app.put("/todos/:id", (req, res) => {
  const id = req.params.id; // origin: part of URL, e.g. /todos/3 -> id === "3" (string)
  const completed = req.body.completed; // origin: client JSON

  // Basic validation: completed must be boolean
  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "completed must be boolean" });
  }

  const sql = "UPDATE todos SET completed = ? WHERE id = ?";
  db.query(sql, [completed, id], (err, results, fields) => {
    // For UPDATE, results is an OkPacket; results.affectedRows tells how many rows matched/changed
    if (err) {
      console.error("Error running UPDATE:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.affectedRows === 0) {
      // no row matched the id
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.json({ message: "Todo updated" });
  });
});

// DELETE /todos/:id
// - Remove a todo by id
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM todos WHERE id = ?";
  db.query(sql, [id], (err, results, fields) => {
    // For DELETE, results.affectedRows indicates how many rows were deleted
    if (err) {
      console.error("Error running DELETE:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.json({ message: "Todo deleted" });
  });
});