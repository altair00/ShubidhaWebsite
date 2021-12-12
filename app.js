const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./router/authRouter');
const path = require('path');


// defining the middlewares
app.use(express.static('public'));
app.use(express.json());

// setting up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates/views'));

app.get('/', (req, res)=>{
    res.render('homepage');
})

// login routes
app.use(authRoutes);

app.get('*', (req, res) => {
    res.render('error');
})


app.listen(port, function() {
    console.log(`connected at ${port}`);
})
