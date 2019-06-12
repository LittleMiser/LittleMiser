var express = require('express');
var app = express();
var expr = require('./LittleMiser_BackEnd/routers/expr');
var paper = require('./LittleMiser_BackEnd/routers/paper')
const ejs = require('ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.engine('html',ejs.renderFile);
app.set('views','LittleMiser');
app.set('view engine','html');

app.use('/createWJ', paper);
app.use('/', expr);
app.use(express.static(__dirname + '/LittleMiser'));

app.get('/index/', function(req,res){
    res.render('index/index')
})

app.listen(1998);

module.exports = app;