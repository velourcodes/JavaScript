// Load environment variables for local development FIRST
if (process.env.NODE_ENV !== 'production') 
{
  require('dotenv').config();
}
// Core modules and libraries
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const fs = require("fs");

// Debugg environment
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");

// Load TiDB CA certificate from file
const caPath = path.join(__dirname, "tidb-ca.pem");
let ca;
try 
{
  ca = fs.readFileSync(caPath);
  console.log("✅ SSL certificate loaded from:", caPath);
} 
catch (err) 
{
  console.error("❌ Failed to load SSL certificate:", err.message);
  process.exit(1);
}
const app = express();

// Smart CORS configuration
const allowedOrigins = 
[
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5075',
  'http://127.0.0.1:5075',
  process.env.FRONTEND_URL, // Netlify URL from environment variable
  'https://todo-api-affan.netlify.app' // Fallback - update after deployment
].filter(Boolean); // Removes any undefined values

app.use(cors(
{
  origin: function (origin, callback) 
  {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) 
    {
      return callback(null, true);
    }
    
    // Additional check for similar patterns
    if (process.env.FRONTEND_URL && origin.includes(process.env.FRONTEND_URL)) 
    {
      return callback(null, true);
    }
    
    console.log('CORS blocked for origin:', origin);
    const msg = 'CORS policy: Origin not allowed';
    return callback(new Error(msg), false);
  },
  credentials: true
}));

app.use(express.json());

const port = process.env.PORT || 5075;

// Only serves static frontend files in development
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, "../frontend")));
  console.log("Serving static files for development");
}
// DB conn setup
let db;
if (process.env.DATABASE_URL) 
{
  console.log("Using DATABASE_URL connection string");
  db = mysql.createConnection(
  {
    uri: process.env.DATABASE_URL,
    ssl: 
    {
      rejectUnauthorized: true,
      ca: ca,
    },
  });
} 
else 
{
  console.error("❌ DATABASE_URL not set. Please check your .env file.");
  process.exit(1);
}

// Attempt to connect to the database
db.connect((err) => 
{
  if (err) 
  {
    console.log("DB CONNECTION FAILED!", err.message);
  } 
  else 
  {
    console.log("✅ DB CONNECTED SUCCESSFULLY!");
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;
  
    db.query(createTableSQL, (err) => 
    {
      if (err) 
      {
        console.log("Error creating table:", err.message);
      } 
      else 
      {
        console.log("✅ Todos table ready!");
      }
    });
  }
});

// API ROUTES
app.get("/api/todos", (req, res) => 
{
  const sql = "SELECT * FROM todos";
  db.query(sql, (err, result) => 
  {
    if (err) 
    {
      return res.status(500).json(
      {
        message: "Internal Server Error",
        error: err.message,
      });
    }
    return res
      .status(200)
      .json({ message: "To-do values sent to frontend!", todo: result });
  });
});

app.post("/api/todos", (req, res) => 
{
  const { title } = req.body;
  if (!title || !title.trim()) 
  {
    return res
      .status(400)
      .json({ message: "Invalid title values from frontend" });
  }
  const sql = "INSERT INTO todos (title) VALUE (?)";
  db.query(sql, [title], (err, result) => 
  {
    if (err) 
    {
      return res
        .status(500)
        .json({ message: "Database Error!", error: err.message });
    }
    return res
      .status(201)
      .json({ message: "New todo created successfully!", todo_id: result.insertId });
  });
});

app.put("/api/todos/:id", (req, res) => 
{
  const { id } = req.params;
  const { completed } = req.body;
  const sql = "UPDATE todos SET completed=(?) WHERE id=(?)";
  db.query(sql, [completed, id], (err, result) => 
  {
    if (err) 
    {
      return res
        .status(500)
        .json({ message: "Database Error!", error: err.message });
    }
    if (result.affectedRows === 0) 
    {
      return res.status(404).json({ message: "No todo found!" });
    }
    return res.status(200).json({ message: "Todo updated", todo_id: id });
  });
});

app.delete("/api/todos/:id", (req, res) => 
{
  const { id } = req.params;
  const sql = "DELETE FROM todos WHERE id=(?)";
  db.query(sql, [id], (err, result) => 
  {
    if (err) 
    {
      return res
        .status(500)
        .json({ message: "Database Error!", error: err.message });
    }
    if (result.affectedRows === 0) 
    {
      return res.status(404).json({ message: "No Match Found!" });
    }
    return res.status(200).json({ message: "Todo removed" });
  });
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

console.log(`\nTHIS PROJECT'S BACKEND IS CODED BY:\n
Developer 1: MOHAMMAD AFFAN SIDDIQI\n
Developer 2: HASAN QURESHI\n`);

app.listen(port, () =>
  console.log(`The server is running on: ${port}`)
);