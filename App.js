const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let visitCount = 0;
let comments = [];

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sirve para los archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Contador de visitas
app.use((req, res, next) => {
    visitCount++;
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { visits: visitCount, comments: comments });
});

app.post('/comment', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment });
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`App escuchando en el servidor http://localhost:${port}`);
});