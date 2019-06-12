var express = require('express');
var router = express.Router();

// 创建问卷
router.get('/createWJ.html',function(req,res){
  console.log('1');
  res.render('createWJ/createWJ.html')
})
router.post('/post_wj', function (req, res) {
  // // 处理跨域
  console.log('/post_wj')
  res.setHeader('Content-type','application/json;charset=utf-8')
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')

  // 获取表单数据
  var name = req.body || 'a';
  console.log(14);
  console.log(name);
  console.log(33)
  // 插入到数据库
  res.send({status:'success',message:true})
})
// 编辑/回答问卷



module.exports = router;
