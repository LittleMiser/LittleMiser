var express = require('express');
var router = express.Router();
var expressSchema = require('../models/express');
var Express = expressSchema.Express;
var mongoose = require('mongoose');
var db = mongoose.connection;
var mongodb = require('mongodb');

// 显示创建快递（信息）网页
router.get('/createExpress/createExpress.html',function(req,res){
    console.log('1')
    res.render('createExpress/createExpress.html')
})

// 显示领取快递（信息）网页
router.get('/getExpress/getExpress.html',function(req,res){
    res.render('getExpress/getExpress.html')
})

router.post('/manageExpress/delete',function(req,res){
    var conditions = {_id: mongodb.ObjectId(req.body.id)};
    db.collection('expresses').deleteOne(conditions, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.error("用户删除成功")
        }
    });
    //res.render('/manageExpress/manageExpress.html')
})

router.post('/manageExpress/cancel',function(req,res){
    var conditions = {_id: mongodb.ObjectId(req.body.id)};
    var updates = {$set: {recept_user: null, isRecepted: false}};
    db.collection('expresses').updateOne(conditions, updates, function (error) {
        if (error) {
            console.error(error);
        } else {
            //console.log(ObjectId(req.body.id));
            console.error("更新成功");
        }
    });
})

// 读取数据库中快递数据，写入get
router.post('/getExpress/get',function(req,res){
    db.collection('expresses').find({}).toArray(function(err, response) {
        res.send(response)
    });
})

router.post('/expressDetail/takeExpress', function(req,res){
    var conditions = {_id: mongodb.ObjectId(req.body.id)};
    var updates = {$set: {recept_user: req.body.user, isRecepted: 1}};
    var expr = db.collection('expresses');
    expr.updateOne(conditions, updates, function (error) {
        if (error) {
            console.error(error);
        } else {
            //console.log(ObjectId(req.body.id));
            console.error("更新成功");
        }
    });
})

router.post('/manageExpress/finish', function(req,res){
    var conditions = {_id: mongodb.ObjectId(req.body.id)};
    var updates = {$set: {isFinished: true}};//将用户名更新为“tiny”
    var expr = db.collection('expresses');
    expr.updateOne(conditions, updates, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.error("更新成功")
        }
    });
})

// 数据库插入操作
function insert(username, name, phoneNum, pay, deadline, address, getAddress, postAddress, info){
    // 数据格式
    var expr =  new expressSchema({
        user: username,
        contact : name,
        phone : phoneNum,
        payment : pay,
        due_date : deadline,
        location: address,
        pickup_address: getAddress,
        delivery_address: postAddress,
        description: info,
        isRecepted: 0,
        isFinished: 0,
        recept_user: null
    });

    expr.save(function(err,res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
        }
    })
}

router.post('/createExpress/createExpress.html', function (req, res) {
    // 处理跨域
    res.setHeader('Content-type','application/json;charset=utf-8')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    // 获取表单数据
    var User = req.body.user;
    var Name = req.body.name;
    var Phone = req.body.phone;
    var Payment = req.body.money;
    var Deadline = req.body.deadline;
    var Address = req.body.address;
    var GetAddress = req.body.getAddress;
    var PostAddress = req.body.postAddress;
    var Info = req.body.info;
    //console.log(req.body.deadline)
    // 插入到数据库
    insert(User, Name, Phone, Payment, Deadline, Address, GetAddress, PostAddress, Info); 

    res.send({status:'success',message:true})
})

module.exports = router;
