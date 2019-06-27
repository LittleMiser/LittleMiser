var express = require('express');
var router = express.Router();
var paperitem = require('../models/paper');
var papers = paperitem.papers;
var mongoose = require('mongoose');
var db = mongoose.connection;
var mongodb = require('mongodb');

// 创建问卷
router.get('/WJinfo.html',function(req,res){
  console.log("填写问卷界面");
  res.render('WJinfo/WJinfo.html')
})

router.post('/fill_in', function (req, res) {

    console.log("问卷填写完成，更新数据库")
   // console.log(req.body);
    var id = req.body['id'];
    var data_ans = req.body['ans']
   // console.log(id);
    var dataFromDB = {};
    db.collection("papers").find({_id: mongodb.ObjectId(id)}).toArray(function(err, result) {
        if (err) throw err;
    //    console.log('result',result);
        dataFromDB = result;

        dataFromDB[0].remain -= dataFromDB[0].every_pay;
        for(var i=0;i<data_ans.length;i++){
            if(dataFromDB[0].questions[i].qtype == 2){
                dataFromDB[0].answer[i].ans.push(data_ans[i].ans_a)
            }
            else{
                dataFromDB[0].answer[i].ans_a += data_ans[i].ans_a;
                dataFromDB[0].answer[i].ans_b += data_ans[i].ans_b; 
                dataFromDB[0].answer[i].ans_c += data_ans[i].ans_c; 
            }
        }
        db.collection("papers").save(dataFromDB[0]);
        res.send(dataFromDB[0])
    });
    
});

module.exports = router;
