$(document).ready(function(){
  console.log('this.newQuestionText',que.newQuestionText);
  axios.post('/getQuestion/search_title', {data:que.newQuestionText})
  .then(function (res) {
    _data = res.data;
    console.log(_data);
    while(que.questions.length){
      que.questions.pop();
    }
    for(var i = 0; i < _data.length; i++) {
      que.questions.push({
        ID: _data[i]._id,
        id: que.nextQuestionId++,
        title: _data[i].title,
        author: _data[i].creator ||'zhangsan',
        questionSet: _data[i].questions,
        remain: _data[i].remain,
        every_pay : _data[i].every_pay,
        deadline: _data[i].deadline
      });
    };
  })
  .catch(function (error) {
  console.log(error);
  });
  divedePage(1);
});
//问卷信息
Vue.component('question-item', {
  template: '\
      <div class="black card">\
        <div class="content">\
          <div class="header">{{ title }}\</div>\
          <div class="description">\
            <p>发布者：{{ author }}</p>\
          </div>\
          <div class="meta">\
            <span class="date">截止日期：{{ deadline }}</span>\
          </div>\
        </div>\
        <div class="ui bottom attached button" v-on:click="gotoWJ">\
          <i class="large edit icon"></i>\
          填写问卷\
        </div>\
      </div>\
  ',
  props: ['id', 'title', 'author', 'deadline'],
  methods: {
    gotoWJ: function() {
      console.log(que.questions[this.id]);
      if(que.questions[this.id].remain <= 0){
        alert('问卷填写名额已满');
      }else{
        var months =  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

          var _deadline = que.questions[this.id].deadline.split(" ");

          _deadline[1] = _deadline[1].split(",")[0];
          
          for(var i = 0;i<months.length;i++){
            if(months[i] == _deadline[0]){
              _deadline[0] = String(i+1);
              break;
            }
          }
          console.log(_deadline);
          var _dl = [_deadline[2], _deadline[0], _deadline[1]];

          _dl = _dl.join('/');
          console.log(_dl);
          var dltime = new Date(_dl);
          var nowtime = new Date();

          console.log('dealine: ',dltime);
          if(dltime.getTime() < nowtime.getTime()){
            alert('问卷已过截止时间');
          }else{
            console.log('填写问卷 id = ',this.id);
            localStorage.setItem("paperInfo", JSON.stringify(que.questions[this.id]))
            window.location.href='../WJinfo/WJinfo.html';
          }
          
      }

    }
  }
})
  
var que = new Vue({
  el: '#questionnaire-list',
  data: {
    newQuestionText: '',
    questions: [],
    nextQuestionId: 0
  },
  methods: {
    
    searchQuestion: function () {
      console.log('this.newQuestionText',que.newQuestionText);
      axios.post('/getQuestion/search_title', {data:que.newQuestionText})
      .then(function (res) {
        _data = res.data;
        console.log(_data);
        while (que.questions.length) {
          que.questions.pop();
        }
        for(var i = 0; i < _data.length; i++) {
          que.questions.push({
            ID: _data[i]._id,
            id: i,
            title: _data[i].title,
            author: _data[i].creator ||'zhangsan',
            questionSet: _data[i].questions,
            remain: _data[i].remain,
            every_pay : _data[i].every_pay,
            deadline: _data[i].deadline
          });
        }
      })
      .catch(function (error) {
      console.log(error);
      });
      this.newQuestionText = '';
      setTimeout(function(){ divedePage(que.questions.length); }, 100);
    }
  }
})

var app = new Vue({ 
  el: '#myheader',
  data: {
      name: 'Little Miser'
  }
});

function divedePage(pageCount) {
  // $("#pagination").pagination(pageCount); //简单初始化方法

  $("#pagination").pagination(pageCount,    //分布总数量，必须参数
  {
    callback: PageCallback,  //PageCallback() 为翻页调用次函数。
    prev_text: "上一页",
    next_text: "下一页",
    items_per_page:9,
    num_edge_entries: 2,       //两侧首尾分页条目数
    num_display_entries: 6,    //连续分页主体部分分页条目数
    current_page: 0 //当前页索引
  });
  
}
  
function PageCallback(page_index,jq)
{
  //console.log(page_index, exp.expresses.length);
  for(var i = 0; i < que.questions.length; i++){
    if(parseInt (i / 9) == page_index){
      $(".black.card:eq(" + i +")").show();
    }
    else{
      $(".black.card:eq(" + i +")").hide();
    }
    
  }
}

function switch_button() {

    $('.ui.sidebar').sidebar({
        context: 'body',
        dimPage : false,
        onVisible: function() {
            $('body').click(function(e){
                this.unbind(e);
            });
        },
        onShow: function() {
            $('.ui.sidebar').css("z-index",999);
            $('#mypusher').css("width","80%");
        },
        onHide: function() {
            $('.ui.sidebar').css("z-index",1);
            $('#mypusher').css("width","100%");
        }
    }).sidebar('toggle');
}
function return_button(){
  $('#release-task').show();
  $('#questionnaire-list').hide();
}

function getWJ() {
  $('#release-task').hide();
  $('#questionnaire-list').show();
}
function getKD() {
  window.location.href='../getExpress/getExpress.html'
}
