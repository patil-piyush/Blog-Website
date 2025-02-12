const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.render('index');
    console.log('Home page');
});

app.get('/create-blog', (req, res) => {
    res.render('create-blog');
    console.log('creating a blog');
});

app.get('/edit-blog', (req, res) => {
    res.render('edit-blog');
    console.log('editing a blog');
});

app.get('/delete-blog', (req, res) => {
    res.render('delete-blog');
    console.log('deleting a blog');
});

app.get('*', (req, res) => {
    res.render('error');
    console.log('error - page not found');
});