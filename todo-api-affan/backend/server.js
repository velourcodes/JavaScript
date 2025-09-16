const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5075;

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Simple MySQL connection for TiDB Cloud
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000,
  // TiDB Cloud requires SSL but we'll use a simple approach
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UECgwGQW1hem9uMRkwFwYDVQQDDBBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoMBkFtYXpvbjEZMBcGA1UEAwwQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIuJruydjsw2hUwsOBYk2o2/nWF09e7/3GXK+F8CLFM9
wYfNqkPPQnGhh4M2+U4XiQ1FJrJgbN8TdwX1EEjSU5cFy5NyXxrvW7I6+J7a+KbC
K8gEIQgZ5+ZobNUa+0x93Nk4Kk7jga5li67aCg0WHC2EeD6e90F2WGiQz2/RgiG0
z3cFkXrCm6LaRuw6k8jS+Cj++d2y5cA0Fp3DpSWlqEUiqWcf5QK5qKXikZTicQ5x
5Z+5+Tp9nD/25VkF0RjVf56YqOaE=
-----END CERTIFICATE-----`
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.log("DB CONNECTION FAILED!", err.message);
  } else {
    console.log("DB CONNECTED SUCCESSFULLY!");
    
    // Create table if it doesn't exist
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    db.query(createTableSQL, (err) => {
      if (err) {
        console.log("Error creating table:", err.message);
      } else {
        console.log("Todos table ready!");
      }
    });
  }
});

// Your API routes (keep these exactly as you had them)
app.get("/api/todos",(req,res) => {
  const sql = "SELECT * FROM todos";
  db.query(sql,(err,result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message});
    }
    return res.status(200).json({message: "To-do values sent to frontend!", todo: result});
  });
});

app.post("/api/todos",(req,res) => {
  const {title} = req.body;
  if(!(title) || !(title.trim())) {
    return res.status(400).json({message: "Invalid title values from frontend"});
  }
  const sql = "INSERT INTO todos (title) VALUE (?)";
  db.query(sql,[title],(err,result) => {
    if (err) {
      return res.status(500).json({message: "Database Error!", error: err.message});
    }
    return res.status(201).json({message: "New todo created successfully!", todo_id: result.insertId});
  });
});

app.put("/api/todos/:id",(req,res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const sql = "UPDATE todos SET completed=(?) WHERE id=(?)";
  db.query(sql, [completed,id],(err,result) => {
    if (err) {
      return res.status(500).json({message: "Database Error!", error: err.message});
    }
    if(result.affectedRows===0) {
      return res.status(404).json({message: "No todo found!"});
    }
    return res.status(200).json({message: "Todo updated", todo_id: id });
  });
});

app.delete("/api/todos/:id",(req,res) => {
  const { id } = req.params;
  const sql = "DELETE FROM todos WHERE id=(?)";
  db.query(sql,[id],(err,result) => {
    if (err) {
      return res.status(500).json({message: "Database Error!", error: err.message});
    }
    if(result.affectedRows===0) {
      return res.status(404).json({message: "No Match Found!"});
    }
    return res.status(200).json({message: "Todo removed"});
  });
});

// Serve frontend for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

console.log(`\nTHIS PROJECT'S BACKEND IS CODED BY:\n
Developer 1: MOHAMMAD AFFAN SIDDIQI\n
Developer 2: HASAN QURESHI\n`);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));