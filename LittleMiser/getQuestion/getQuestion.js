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
        questionSet: _data[i].questions,
        author: _data[i].author ||'zhangsan',
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
      for(var i = 0; i < que.questions.length; i++) {
        if (this.id == que.questions[i].id) {
          console.log(this.id);
          localStorage.setItem("paper", JSON.stringify(que.questions[i]))
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
    nextQuestionId: 1
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
            id: que.nextQuestionId++,
            title: _data[i].title,
            author: _data[i].author ||'zhangsan',
            questionSet: _data[i].questions,
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
// function search() {
//   console.log('this.newQuestionText',que.newQuestionText);
//   axios.post('/getQuestion/search_title', {data:que.newQuestionText})
//   .then(function (res) {
//     _data = res.data;
//     console.log(_data);
//     for(var i = 0; i < _data.length; i++) {
//       que.questions.push({
//         id: que.nextQuestionId++,
//         title: _data[i].title,
//         author: _data[i].author ||'zhangsan',
//         deadline: _data[i].deadline
//       });
//     };
//   })
//   .catch(function (error) {
//   console.log(error);
//   });
// }

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
