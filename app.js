const express = require('express');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodemysql'
});

db.connect((err)=>{
  if(err){
    throw err;
  }
  console.log('Mysql connected...')
});

const app = express();

//Create DB
app.get('/createdb', (req, res) =>{
  let sql = 'create database nodemysql';
  db.query(sql, (err, result) =>{
    if(err) throw err;
    console.log(result);
    res.send('Database created...')
  });
});

//create table
app.get('/createpoststable', (req, res) => {
  let sql = 'create table posts(id int AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(255))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Posts table created...');
  });
});

//Insert post 1
app.get('/addpost1', (req, res) => {
  let post = {title: 'Post one', body: 'This is post number one'};
  let sql = 'insert into posts set ?';
  let query =db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post 1 added...');
  });
});

//Insert post 2
app.get('/addpost2', (req, res) => {
  let post = {title: 'Post one', body: 'This is post number two'};
  let sql = 'insert into posts set ?';
  let query =db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post 2 added...');
  });
});

//Select Posts
app.get('/getposts', (req, res) => {
  let sql = 'select * from posts';
  let query =db.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.send(results);
  });
});

//Select single post
app.get('/getpost/:id', (req, res) => {
  let sql = `select * from posts where id = ${req.params.id}`;
  let query =db.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.send(results);
  });
});

//Update post
app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'UPdated Title';
  let sql = `update posts set title = '${newTitle}' where id = ${req.params.id}`;
  let query =db.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.send('Post updated...');
  });
});

//delete post
app.get('/deletepost/:id', (req, res) => {
  let sql = `delete from posts where id = ${req.params.id}`;
  let query =db.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.send('Post deleted...');
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});
