const express = require('express');
const app = express();
app.use(express.static('public'));
const ejs = require('ejs');
const userRoute = require('./routes/user');
const { json } = require('body-parser');
const mongoose = require('mongoose');


app.set('view engine', 'ejs');

const port = 3000;

mongoose.connect('mongodb://localhost:27017/BlogTV').then(() => console.log("mongodb connected"));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 



app.use('/user',userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/create-blog', (req, res) => {
    res.render('create-blog');
});

app.get('/edit-blog', (req, res) => {
    res.render('edit-blog');
});

app.get('/delete-blog', (req, res) => {
    res.render('delete-blog');
});

app.get('*', (req, res) => {
    res.render('error');
});


