var express = require('express');
var router = express.Router();
var paperitem = require('../models/paper');
var papers = paperitem.papers;
var mongoose = require('mongoose');
var db = mongoose.connection;
var mongodb = require('mongodb');
// 创建问卷
router.get('/manageQuestion.html',function(req,res){
  console.log("进入问卷管理界面");
  res.render('manageQuestion/manageQuestion.html')
})

router.post('/search_author', function (req, res) {
  
    console.log("加载全部问卷信息:search_author");
    db.collection("papers"). find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log("加载成功");
      console.log(result);
      res.send(result)
    });

});
router.post('/delete_wj', function (req, res) {
  var deid = req.body['id'];
  console.log("删除问卷 id = ",deid);
  db.collection("papers").remove({_id: mongodb.ObjectId(deid)});

  console.log("删除成功");
  res.send('succeess');

});
module.exports = router;
