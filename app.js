const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./router/authRouter');
const accommodation = require('./router/accommodation');
const path = require('path');
const favicon = require('serve-favicon');


// defining the middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));

// setting up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates/views'));

app.get('/', (req, res)=>{
    res.render('homepage');
})

app.get('/about', (req, res)=>{
    res.render('about');
})

app.get('/contact', (req, res)=>{
    res.render('contact');
})

// login routes
app.use(authRoutes);
//accomodation routes
app.use(accommodation);

app.get('*', (req, res) => {
    res.render('error');
})


app.listen(port, function() {
    console.log(`connected at ${port}`);
})
