const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tododatabase',
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM todo";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post("/api/insert", (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const description = req.body.description
    const createdTime = req.body.createdTime
    const createdBY = req.body.createdBY
    const completed = req.body.completed

    const sqlInsert = "INSERT INTO todo (id, title, description, createdTime, createdBY, completed) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert, [id, title, description, createdTime, createdBY, completed], (err, result) => {
        console.log(result);
    });
});

app.delete("/api/delete/:id", (req,res)=>{
    const id = req.params.id
    const sqlDelete = "DELETE FROM todo WHERE id=?";

    db.query(sqlDelete, id, (err,result) => {
      if (err) console.log(err)  
    })   
})

app.put("/api/update", (req,res)=>{
    const id = req.body.id
    const completed = req.body.completed
    const sqlUpdate = "UPDATE todo SET completed=? WHERE id=?";

    db.query(sqlUpdate, [completed,id],(err,result) => {
      if (err) console.log(err)  
    })   
})

app.listen(3001, () => {
    console.log("running on port 3001");
});


