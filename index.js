const express = require('express');
const app = express();
app.use(express.static('public'));
const ejs = require('ejs');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const {checkAuthenticationCookie} = require('./middlewares/authentication')
const cookieParser = require('cookie-parser');



app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URL).then(() => console.log("mongodb connected"));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(checkAuthenticationCookie("token"));



app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
    res.render('home');
});



app.get('*', (req, res) => {
    res.render('error');
});


