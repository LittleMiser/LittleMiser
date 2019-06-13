var express = require('express');
var router = express.Router();
var paperitem = require('../models/paper');
var papers = paperitem.papers;
var mongoose = require('mongoose');
var db = mongoose.connection;

// 创建问卷
router.get('/createWJ.html',function(req,res){
  console.log("进入问卷界面");
  res.render('createWJ/createWJ.html')
})
router.post('/post_wj', function (req, res) {
  console.log("开始创建问卷")
  
  db.collection("papers").insertOne(req.body, function(err, response) {
    if (err) throw err;
    console.log("问卷创建成功");
    res.send(response)
  });

});


module.exports = router;
