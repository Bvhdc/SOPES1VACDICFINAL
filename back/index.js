const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

app.use(cors({
    origin: '*',  // Permitir solicitudes desde cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  }));
app.use(express.json())
const db = mysql.createConnection({
    host:"mysql",
    user:"root",
    password:"bhernandez201700672",
    database:"bhernandez201700672"
});

app.post("/create",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    db.query('INSERT INTO Usuarios(username,password) VALUES(?,?)',[username,password],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("usuario registrado");
        }
    });



});


app.get("/usuarios",(req,res)=>{
    db.query('SELECT * FROM Usuarios',(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });



});



app.put("/update",(req,res)=>{
    const id = req.body.id
    const username = req.body.username;
    const password = req.body.password;
    db.query('UPDATE Usuarios SET username=?,password=? WHERE username=?',[username,password,id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("usuario actualizado");
        }
    });



});
app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id
    db.query('DELETE FROM Usuarios WHERE username=?',[id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("usuario eliminado");
        }
    });



});

app.get("/usuario/:id",(req,res)=>{
    const id = req.params.id
    db.query('SELECT * FROM Usuarios WHERE username=?',[id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });



});




app.listen(3001,()=>{
    console.log("Running on 3001")
});