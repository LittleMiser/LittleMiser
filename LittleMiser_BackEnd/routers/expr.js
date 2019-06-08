var express = require('express');
var router = express.Router();
var expressSchema = require('../models/express');

// 显示创建快递（信息）网页
router.get('/createExpress/createExpress.html',function(req,res){
    res.render('createExpress/createExpress.html')
})

// 数据库插入操作
function insert(name, phoneNum, pay, address, getAddress, postAddress, info){
    // 数据格式
    var expr =  new expressSchema({
        contact : name,
        phone : phoneNum,
        payment : pay,
        location: address,
        pick_up_address: getAddress,
        delivery_address: postAddress,
        description: info
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
    var Name = req.body.name;
    var Phone = req.body.phone;
    var Payment = req.body.money;
    var Address = req.body.address;
    var GetAddress = req.body.getAddress;
    var PostAddress = req.body.postAddress;
    var Info = req.body.info;

    // 插入到数据库
    insert(Name, Phone, Payment, Address, GetAddress, PostAddress, Info); 

    res.send({status:'success',message:true})
})

module.exports = router;
