// Load environment variables for local development FIRST
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const fs = require("fs");

console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");

// Load TiDB CA certificate
const caPath = path.join(__dirname, "tidb-ca.pem");
let ca;
try 
{
  ca = fs.readFileSync(caPath);
  console.log("✅ SSL certificate loaded");
} 
catch (err) 
{
  console.error("❌ Failed to load SSL certificate:", err.message);
  process.exit(1);
}

const app = express();

// CORS configuration
const allowedOrigins = 
[
  'http://localhost:3000', 'http://127.0.0.1:3000',
  'http://localhost:5075', 'http://127.0.0.1:5075',
  process.env.FRONTEND_URL, 'https://todo-api-affan.netlify.app'
].filter(Boolean);

app.use(cors(
{
  origin: (origin, callback) => 
  {
    if (!origin || allowedOrigins.includes(origin) || 
        (process.env.FRONTEND_URL && origin.includes(process.env.FRONTEND_URL))) 
    {
      callback(null, true);
    } 
    else 
    {
      console.log('CORS blocked:', origin);
      callback(new Error('CORS policy: Origin not allowed'));
    }
  },
  credentials: true
}));

app.use(express.json());
const port = process.env.PORT || 5075;

// Serve static files in development only
if (process.env.NODE_ENV !== 'production') 
{
  app.use(express.static(path.join(__dirname, "../frontend")));
  console.log("Serving static files for development");
}

// Database connection with reconnection logic
let db;
let isDatabaseConnected = false;

function connectToDatabase() 
{
  if (!process.env.DATABASE_URL) 
  {
    console.error("❌ DATABASE_URL not set");
    process.exit(1);
  }

  console.log("🔗 Attempting database connection...");
  
  db = mysql.createConnection(
  {
    uri: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true, ca: ca },
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true,
  });

  db.connect((err) => 
  {
    if (err) 
    {
      console.error("❌ DB CONNECTION FAILED:", err.message);
      setTimeout(connectToDatabase, 5000);
    } 
    else 
    {
      isDatabaseConnected = true;
      console.log("✅ DB CONNECTED SUCCESSFULLY!");
      
      // Create table if it doesn't exist
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS todos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          completed BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
      db.query(createTableSQL, (err) => 
      {
        if (err) console.error("Error creating table:", err.message);
        else console.log("✅ Todos table ready!");
      });
    }
  });

  db.on('error', (err) => {
    console.error('❌ Database error:', err.message);
    isDatabaseConnected = false;
    setTimeout(connectToDatabase, err.code === 'PROTOCOL_CONNECTION_LOST' ? 2000 : 5000);
  });
}

connectToDatabase();

// Database health check middleware
const checkDatabaseConnection = (req, res, next) =>
{
  if (!isDatabaseConnected) 
  {
    return res.status(503).json(
    {
      message: "Database temporarily unavailable",
      error: "Please try again in a few seconds"
    });
  }
  next();
};

// ✅ API ROUTES
app.get("/api/todos", checkDatabaseConnection, (req, res) => 
{
  const sql = "SELECT * FROM todos";
  db.query(sql, (err, result) => 
  {
    if (err) 
    {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
    return res.status(200).json({ message: "To-do values sent to frontend!", todo: result });
  });
});

app.post("/api/todos", checkDatabaseConnection, (req, res) => 
{
  const { title } = req.body;
  if (!title || !title.trim()) 
  {
    return res.status(400).json({ message: "Invalid title values from frontend" });
  }
  const sql = "INSERT INTO todos (title) VALUE (?)";
  db.query(sql, [title], (err, result) =>
  {
    if (err) 
    {
      return res.status(500).json({ message: "Database Error!", error: err.message });
    }
    return res.status(201).json({ message: "New todo created successfully!", todo_id: result.insertId });
  });
});

app.put("/api/todos/:id", checkDatabaseConnection, (req, res) => 
{
  const { id } = req.params;
  const { completed } = req.body;
  const sql = "UPDATE todos SET completed=(?) WHERE id=(?)";
  db.query(sql, [completed, id], (err, result) => 
  {
    if (err) 
    {
      return res.status(500).json({ message: "Database Error!", error: err.message });
    }
    if (result.affectedRows === 0) 
    {
      return res.status(404).json({ message: "No todo found!" });
    }
    return res.status(200).json({ message: "Todo updated", todo_id: id });
  });
});

app.delete("/api/todos/:id", checkDatabaseConnection, (req, res) => 
{
  const { id } = req.params;
  const sql = "DELETE FROM todos WHERE id=(?)";
  db.query(sql, [id], (err, result) => 
  {
    if (err) 
    {
      return res.status(500).json({ message: "Database Error!", error: err.message });
    }
    if (result.affectedRows === 0) 
    {
      return res.status(404).json({ message: "No Match Found!" });
    }
    return res.status(200).json({ message: "Todo removed" });
  });
});

// Health check endpoint
app.get('/health', (req, res) => 
{
  res.status(200).json({ 
    status: isDatabaseConnected ? 'healthy' : 'degraded',
    message: 'Server is running',
    database: isDatabaseConnected ? 'connected' : 'disconnected'
  });
});

console.log(`\nTHIS PROJECT'S BACKEND IS CODED BY:\n
Developer 1: MOHAMMAD AFFAN SIDDIQI\n
Developer 2: HASAN QURESHI\n`);

app.listen(port, () => console.log(`The server is running on: ${port}`));