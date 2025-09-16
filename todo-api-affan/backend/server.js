const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5075 ;

app.use(express.static(path.join(__dirname, "../frontend")));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000,
  ssl: {
    rejectUnauthorized: true
  }
})

console.log(`\nTHIS PROJECT'S BACKEND IS CODED BY:\n
Developer: MOHAMMAD AFFAN SIDDIQI`);
db.connect((err) => 
{
    if(err)
    {
        console.log("DB CONNECTION FAILED!");
        throw err;
    }
    console.log("DB CONNECTED SUCCESSFULLY!");
});
app.get("/api/todos",(req,res) =>
{
    const sql = "SELECT * FROM todos";
    db.query(sql,(err,result) => 
    {
        if(err)
        {
            return res.status(500).json({
                message: "Internal Server Error",
                error: err.message});
        }
        console.log("Database result:", result);
        return res.status(200).json({message: "To-do values sent to frontend!",todo: result});
    });
});

app.post("/api/todos",(req,res) =>
{
    const {title} = req.body;
    if(!(title) || !(title.trim()))
    {
        return res.status(400).json(
        {
            message: "Invalid title values from frontend"
        });
    }
    const sql = "INSERT INTO todos (title) VALUE (?)";
    db.query(sql,[title],(err,result) =>
    {
        if(err)
        {
            return res.status(500).json(
            {
                message: "Database Error!",error: err.message
            });
        }
        return res.status(201).json(
        {
            message: "New todo created successfully!", todo_id: result.insertId
        });
    });
});

app.put("/api/todos/:id",(req,res) =>
{
    const { id } = req.params;
    const { completed } = req.body;
    const sql = "UPDATE todos SET completed=(?) WHERE id=(?)";
    db.query(sql, [completed,id],(err,result) =>
    {
        if(err)
        {
            return res.status(500).json({message: "Database Error!", error: err.message});
        }
        if(result.affectedRows===0)
        {
            return res.status(404).json({message: "No todo found!",error: err.message});
        }
        return res.status(200).json({message: "Todo updated", todo_id: id });
    });
});

app.delete("/api/todos/:id",(req,res) => 
{
    const { id } = req.params;
    const sql = "DELETE FROM todos WHERE id=(?)";
    db.query(sql,[id],(err,result) =>
    {
        if(err)
        {
            return res.status(500).json({message: "Database Error!", error: err.message});
        }
        if(result.affectedRows===0)
        {
            return res.status(404).json({message: "No Match Found!",error: err.message});
        }
        return res.status(200).json({message: "Todo removed"});
    });
});
console.log(`\nTHIS PROJECT'S BACKEND IS CODED BY:\n
Developer 1: MOHAMMAD AFFAN SIDDIQI
`);
// app.get("/", (req, res) => 
// {
//   res.send("Hosting on Render 🚀...");
// });
app.listen(port, () =>
console.log(`The server is running on ${port}`));