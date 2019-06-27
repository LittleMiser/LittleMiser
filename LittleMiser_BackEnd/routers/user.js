var express = require('express');
var router = express.Router();
var userSchema = require('../models/user');
var User = userSchema.User;
var mongoose = require('mongoose');
var db = mongoose.connection;

// 显示创建user（信息）网页
router.get('/register/register.html',function(req,res){
    console.log('show create user')
    res.setHeader('Content-type','application/json;charset=utf-8')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    res.render('register/register.html')
})

// update personal code
router.post('/personalInfo/updateCode',function(req,res){
    console.log("updatePersonal");
    res.setHeader('Content-type','application/json;charset=utf-8')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    // 获取表单数据
    var myContact = req.body.creator;
    var content = req.body.content;


    db.collection('users').update({"Contact": myContact}, {$set:{Code: content}}, function(err, response) {
        if(err){
            console.log(err);
        }
        else{
            console.log(response);
        }
        res.send(response);
    });

})

// update personal info
router.post('/personalInfo/updatePersonal',function(req,res){
    console.log("updatePersonal");
    res.setHeader('Content-type','application/json;charset=utf-8')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    // 获取表单数据
    var myContact = req.body.creator;
    var myNickName = req.body.Nickname;
    var myold = req.body.Old;
    var myGrade = req.body.Grade;
    var mymajor = req.body.Major;
    var data_ = {
        NickName:myNickName,
        old:myold,
        Grade:myGrade,
        Major:mymajor
    };
    console.log(data_);
    db.collection('users').updateOne({"Contact": myContact}, {$set:{NickName:myNickName,old:myold,Grade:myGrade,Major:mymajor}}, function(err, response) {
        if(err){
            console.log(err);
        }
        else{
            console.log("response");
            console.log(response);
        }
        res.send(response);
    });

})

// payWJ
router.post('/createWJ/post_payEvery',function(req,res){
    console.log("lalala");
    res.setHeader('Content-type','application/json;charset=utf-8')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    // 获取表单数据
    var myContact = req.body.creator;
    var myPay = req.body.pay;
    db.collection('users').updateOne({"Contact": myContact}, {$inc: {"Money": +myPay}}, function(err, response) {
        if(err){
            console.log(err);
        }
        else{
            console.log(response);
        }
        res.send(response);
    });

})

//'/createWJ/post_returnWJ'
router.post('/createWJ/post_returnWJ',function(req,res){
    console.log("lalala");
    res.setHeader('Content-type','application/json;charset=utf-8')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    // 获取表单数据
    var myContact = req.body.creator;
    var myPay = req.body.remain;
    db.collection('users').updateOne({"Contact": myContact}, {$inc: {"Money": +myPay}}, function(err, response) {
        if(err){
            console.log(err);
        }
        else{
            console.log(response);
        }
        res.send(response);
    });

})

// /User/expressDetail/post_payEx
router.post('/expressDetail/post_payEx',function(req,res){
    // console.log("lalala");
    res.setHeader('Content-type','application/json;charset=utf-8')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    // 获取表单数据
    var myContact = req.body.creator;
    var myPay = (req.body.total_bonus);
    // console.log("pay", typeof(myPay));
    db.collection('users').updateOne({"Contact": myContact}, {$inc: {"Money": -myPay}}, function(err, response) {
        
        if(err){
            console.log("error");
        }
        else{
            console.log("response");
            // console.log(response);
        }
        res.send(response);
    });

})

// '/createWJ/post_payWJ'
router.post('/createWJ/post_payWJ',function(req,res){
    // console.log("lalala");
    res.setHeader('Content-type','application/json;charset=utf-8')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    // 获取表单数据
    var myContact = req.body.creator;
    var myPay = (req.body.total_bonus);
    // console.log("pay", typeof(myPay));
    db.collection('users').updateOne({"Contact": myContact}, {$inc: {"Money": -myPay}}, function(err, response) {
        
        if(err){
            console.log("error");
        }
        else{
            console.log("response");
            // console.log(response);
        }
        res.send(response);
    });

})

// 数据库插入操作
function insert(myIdentity, myContact, myCode, myNickName, myName, myold, myStudentNum, mySex, myGrade, mymajor){
    // 数据格式

    console.log("SexType:   " + typeof(mySex));
    console.log("Sex:   " + mySex);

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
        Major:mymajor,
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
    var myGrade = req.body.myGrade;
    var mymajor = req.body.mymajor;

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

// Info
router.post('/personalInfo/personalInfo.html', function (req, res) {
    console.log('Info post');
    // 处理跨域
    res.setHeader('Content-type','application/json;charset=utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    // 获取表单数据
    var myContact = req.body.myContact;
    var data_ = {
        Contact:myContact
    };

    console.log(data_);
    db.collection('users').find(data_).toArray(function(err, response) {
        console.log("response");
        console.log(response);
        res.send(response);
    });

})
module.exports = router;
