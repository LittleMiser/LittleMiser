var express = require('express');
var router = express.Router();
var paperitem = require('../models/paper');
var papers = paperitem.papers;
var mongoose = require('mongoose');
var db = mongoose.connection;

// 创建问卷
router.get('/getQuestion.html',function(req,res){
  console.log("进入问卷信息摘要界面");
  res.render('getQuestion/getQuestion.html')
})
// router.post('/post_wj', function (req, res) {
//   console.log("加载摘要详情")
  
//   db.collection("papers"). find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log("加载成功");
//   //  console.log(result);
//     res.send(result)
//   });

// });
router.post('/search_title', function (req, res) {
  
  if(req.body['data']==''){
    console.log("加载全部问卷信息");
    db.collection("papers"). find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log("加载成功");
    //  console.log(result);
      res.send(result)
    });
  }
  else{
    console.log("加载搜索详情")
    db.collection("papers"). find({title: req.body['data']}).toArray(function(err, result) {
      if (err) throw err;
      console.log("加载成功");
      console.log(result);
      res.send(result)
    });
  }
  

});

module.exports = router;
