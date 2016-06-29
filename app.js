var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/libreria');

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
//var books = require('./routes/books');
var api = require('./routes/api');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
//app.use('/books', books);

module.exports = app;