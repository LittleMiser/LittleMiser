var express = require('express');
var app = express();
var expr = require('./LittleMiser_BackEnd/routers/expr');
var createPaper = require('./LittleMiser_BackEnd/routers/createPaper');
var createUser = require('./LittleMiser_BackEnd/routers/user');
var getPaperInfo = require('./LittleMiser_BackEnd/routers/getPaperInfo');
var fillPaper = require('./LittleMiser_BackEnd/routers/fillPaper');
var managePaper = require('./LittleMiser_BackEnd/routers/managePaper');
const ejs = require('ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.engine('html',ejs.renderFile);
app.set('views','LittleMiser');
app.set('view engine','html');

app.use('/createWJ', createPaper);
app.use('/getQuestion', getPaperInfo);
app.use('/WJinfo', fillPaper);
app.use('/manageQuestion', managePaper);
app.use('/', expr);
app.use('/', createUser);
app.use(express.static(__dirname + '/LittleMiser'));

app.get('/index/', function(req,res){
    res.render('index/index')
})

app.listen(1998);

module.exports = app;