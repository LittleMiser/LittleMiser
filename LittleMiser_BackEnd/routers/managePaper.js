var express = require('express');
var router = express.Router();
var paperitem = require('../models/paper');
var papers = paperitem.papers;
var mongoose = require('mongoose');
var db = mongoose.connection;

// 创建问卷
router.get('/manageQuestion.html',function(req,res){
  console.log("进入问卷管理界面");
  res.render('manageQuestion/manageQuestion.html')
})

router.post('/search_author', function (req, res) {
  
    console.log("加载全部问卷信息");
    db.collection("papers"). find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log("加载成功");
    //  console.log(result);
      res.send(result)
    });

});

module.exports = router;
