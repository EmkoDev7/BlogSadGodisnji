const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { v4 } = require('uuid');
const path = require('fs')
const app = express();
const port = 3000;



app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));



app.get('/', (req, res) => {
  res.render('welcome');
});


const userRoutes = require('./routes/user.routes')
app.use(userRoutes)

app.listen(port);

