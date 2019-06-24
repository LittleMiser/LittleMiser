var express = require('express');
var router = express.Router();
var userSchema = require('../models/user');
var User = userSchema.User;
var mongoose = require('mongoose');
var db = mongoose.connection;

// 显示创建user（信息）网页
router.get('/register/register.html',function(req,res){
    console.log('show create user')
    res.render('register/register.html')
})

// 读取数据库中user数据，写入get
router.post('/getExpress/get',function(req,res){
    db.collection('users').find({}).toArray(function(err, response) {
        res.send(response)
    });
})

// 数据库插入操作
function insert(myIdentity, myContact, myCode, myNickName, myName, myold, myStudentNum, mySex, myGrade, mymajor){
    // 数据格式
    var user =  new userSchema({
        Identity:myIdentity,
        Contact:myContact,
        Code:myCode,
        NickName:myNickName,
        Name:myName,
        old:myold,
        StudentNum:myStudentNum,
        Sex:mySex,
        Grade:myGrade,
        major:mymajor,
        Money:parseFloat("5000")
    });

    user.save(function(err,res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
        }
    })
}

// register
router.post('/register/register.html', function (req, res) {
    console.log('register post')
    // 处理跨域
    res.setHeader('Content-type','application/json;charset=utf-8')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    // 获取表单数据
    var myIdentity = req.body.myIdentity;
    var myContact = req.body.myContact;
    var myCode = req.body.myCode;
    var myNickName = req.body.myNickName;
    var myName = req.body.myName;
    var myold = req.body.myold;
    var myStudentNum = req.body.myStudentNum;
    var mySex = req.body.mySex;
    var myGrade = req.body.myStudentNum;
    var mymajor = req.body.mySex;

    //console.log(req.body.deadline)
    // 插入到数据库
    insert(myIdentity, myContact, myCode, myNickName, myName, myold, myStudentNum, mySex, myGrade, mymajor); 

    res.send({status:'success',message:true})
})




// login
router.post('/index/index.html', function (req, res) {
    console.log('index post');
    // 处理跨域
    res.setHeader('Content-type','application/json;charset=utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    var jum = false;
    // 获取表单数据
    var myContact = req.body.myContact;
    var myCode = req.body.myCode;

    var data_ = {
        Contact:myContact,
        Code:myCode,
    };

    console.log(data_);
    db.collection('users').find(data_).count(function(err, response) {
        console.log(response);
        if (response == 1) {
            console.log("true");
            res.send({status:'success',message:true})
        }
        else
            res.send({status:'success',message:false})
    });


    
})

module.exports = router;
