var router = require('koa-router')();
//var user = require('../models/user');
var paper = require('../models/paper');
//var jwt = require('jsonwebtoken');

// 创建问卷
router.get('/createWJ/createWJ.html', function*(next) {
  yield this.render('/createWJ/createWJ.html', {
    title: 'Paper'
  });
});

// 编辑/回答问卷
router.get('/getMission/getMission.html', function* (next) {
    yield this.render('/getMission/getMission.html', {
      title: 'Paper'
    });
});



module.exports = router;
