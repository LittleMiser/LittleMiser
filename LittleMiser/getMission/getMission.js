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
        <div class="ui bottom attached button" v-on:click="$emit(\'remove\')">\
          <i class="large edit icon"></i>\
          填写问卷\
        </div>\
      </div>\
  ',
  props: ['title', 'author', 'deadline']
})
  
new Vue({
  el: '#questionnaire-list',
  data: {
    newQuestionText: '',
    questions: [
      {
        id: 1,
        title: 'Do the dishes',
        author: '张三',
        deadline: '2019.6.8'
      },
      {
        id: 2,
        title: 'Take out the trash',
        author: '李四',
        deadline: '2019.6.9'
      },
      {
        id: 3,
        title: 'Mow the lawn',
        author: '王五',
        deadline: '2019.6.10'
      }
    ],
    nextQuestionId: 4
  },
  methods: {
    searchQuestion: function () {
      this.questions.push({
        id: this.nextQuestionId++,
        title: this.newQuestionText,
        author: 'xxx',
        deadline: 'xxxx-xx-xx'
      })
      this.newQuestionText = ''
    }
  }
})

//快递信息
Vue.component('express-item', {
  template: '\
      <div class="black card">\
        <div class="content">\
          <div class="header">领取地址：{{ address }}\</div>\
          <div class="description">\
            <p>发布者：{{ author }}</p>\
          </div>\
          <p class="meta">\
            截止日期：{{ deadline }}\
          </p>\
          <div class="extra">\
            报酬：{{ money }}\
          </div>\
        </div>\
        <div class="ui bottom attached button" v-on:click="$emit(\'remove\')">\
          <i class="large briefcase icon"></i>\
          快递详情\
        </div>\
      </div>\
  ',
  props: ['address', 'author', 'deadline', 'money']
})
  
new Vue({
  el: '#express-list',
  data: {
    newExpressText: '',
    expresses: [
      {
        id: 1,
        address: '菜鸟驿站',
        author: '张三',
        deadline: '2019.6.8',
        money: '$2'
      },
      {
        id: 2,
        address: '丰巢',
        author: '李四',
        deadline: '2019.6.9',
        money: '$3'
      },
      {
        id: 3,
        address: '天桥底',
        author: '王五',
        deadline: '2019.6.10',
        money: '$4'
      }
    ],
    nextExpressId: 4
  },
  methods: {
    searchExpress: function () {
      this.expresses.push({
        id: this.nextExpressId++,
        address: this.newExpressText,
        author: 'xxx',
        deadline: 'xxxx-xx-xx',
        money: '$0.0'
      })
      this.newExpressText = ''
    }
  }
})

var app = new Vue({ 
  el: '#myheader',
  data: {
      name: 'Little Miser'
  }
});

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
  $('#express-list').hide();
}

function getWJ() {
  $('#release-task').hide();
  $('#questionnaire-list').show();
}
function getKD() {
  $('#release-task').hide();
  $('#express-list').show();
}
