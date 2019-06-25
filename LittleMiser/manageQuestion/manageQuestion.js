
var app = new Vue({ 
  el: '#myheader',
  data: {
    name: 'Little Miser'
  }
})

Vue.component('ul_item',  {
  template: '\
		<div class="ui middle aligned animated selection fabu list">\
			<div class="item">\
    		<div class="right floated content">\
    			<div class="ui teal buttons">\
						<div class="ui top right pointing dropdown icon button">\
    					<i class="dropdown icon"></i>\
    					<div class="menu transition hidden">\
      					<a class="item" v-on:click="gotoTJ"><i class="eye icon"></i>查看统计</a>\
                <div class="item" v-on:click="deleteWJ"><i class="delete icon"></i>删除问卷</div>\
    					</div>\
						</div>\
			   	</div>\
  			</div>\
    		<div>{{title}}<div>{{deadline}}</div></div>\
		  </div>\
  	  <hr/>\
    </div>\
  ',
  props: ['id','title','deadline'],
  methods: {
    gotoTJ: function() {

        console.log('gotoTJ:',this.id);
        localStorage.setItem("statistics", JSON.stringify(que.fabu_questions[this.id]));
        console.log(localStorage.getItem("statistics"));
        window.location.href='../statistics/statistics.html';
    
  },
  deleteWJ: function(){
    var deid = que.fabu_questions[this.id].ID;
    console.log('delete id = ',deid);
    axios.post('/manageQuestion/delete_wj', {id: deid})
    .then(function (res) {
    //  window.location.href='../manageQuestion/manageQuestion.html';
    })
    .catch(function (error) {
    console.log(error);
    });  
    alert('问卷删除成功，返还 '+ que.fabu_questions[this.id].remain);
    location.reload(); 
    
    // todo 问卷删除：返还剩余奖金，当前账户 +　que.fabu_questions[this.id].remain





  }
}
})
//不可删，只用一个component显示会冲突
Vue.component('jieshou_item',  {
  template: '\
    <div class="ui middle aligned animated selection jieshou list">\
      <div class="item">\
        <div class="right floated content">\
          <div class="ui teal buttons">\
            <div class="ui button">{{finish_question}}</div>\
            <div class="ui top right pointing dropdown icon button">\
              <i class="dropdown icon"></i>\
              <div class="menu transition hidden">\
                <div class="item" v-on:click="$emit(\'change_state\')"><i class="yen sign icon"></i>完成任务</div>\
                <div class="item" v-on:click="$emit(\'remove\')"><i class="delete icon"></i>删除问卷</div>\
              </div>\
            </div>\
          </div>\
        </div>\
        <div>{{title}}<div>{{deadline}}</div></div>\
      </div>\
      <hr/>\
    </div>\
  ',
  props: ['title','deadline','finish_question']

})



var que = new Vue({
  el: '#mypusher',
  data: {

    fabu_questions: [],
    jieshou_questions:[],
    finish_question:'未完成',

    fabu_nextQuestionId: 0,
    jieshou_nextQuestionId:0,
    isA: true,
    isB: true,
    isC: true,
    isD: false,
    first_fabu:true,
    first_jieshou:true,
    isFabu:true
  },
  /*
  mounted:function() {
    this.$nextTick(function () {
     this.publish();
   })
  },
  */

  methods: {

    getWJ:function() {
      $('#release-task').hide();
      $('#questionnaire-list').show();
      this.temp(1);
      this.fabu_questions.pop();
      this.fabu_nextQuestionId--;
      setTimeout(function(){ divedePage(que.fabu_questions.length); }, 10);
      $('#jieshou_list').hide();
      $('#fabu_list').show();
      this.isB = true;
      this.isD = false;
    },
    getKD:function() {
      window.location.href='../manageExpress/manageExpress.html'
    },
    temp:function(num) {
      if(num == 1) {
        this.fabu_questions.push({
          id: this.fabu_nextQuestionId++,
          title:'fabutemp'+this.fabu_nextQuestionId,
          deadline: 'xxxx-xx-xx',
          finish_question:'未完成'
        });
        $('.dropdown').dropdown();
      }else {
        this.jieshou_questions.push({
          id: this.jieshou_nextQuestionId++,
          title:'jieshoutemp'+this.jieshou_nextQuestionId,
          deadline: 'xxxx-xx-xx',
          finish_question:'未完成'
        });
        $('.dropdown').dropdown();
      }
    },
    publish:function() {
      this.isFabu = true;
      if(this.first_fabu) {
        axios.post('/manageQuestion/search_creator', {creator: localStorage.getItem("username")})
        .then(function (res) {
          _data = res.data;
          console.log(_data);
          while(que.fabu_questions.length){
            que.fabu_questions.pop();
          }
          for(var i = 0; i < _data.length; i++) {
            que.fabu_questions.push({
              ID: _data[i]._id,
              id: i,
              title: _data[i].title,
              questionSet: _data[i].questions,
              answers: _data[i].answer,
              remain: _data[i].remain,
              creator: _data[i].creator ||'zhangsan',
              deadline: _data[i].deadline
            });
            $('.dropdown').dropdown();
          };
         // localStorage.setItem("statistics", JSON.stringify(que.fabu_questions));
        })
        .catch(function (error) {
        console.log(error);
        }); 
      //显示当前用户已发布的问卷
      //search已发布,读取数据
      //
      // for(var i = 0;i < 7 ;i++) {
      //   this.fabu_questions.push({
      //     id: this.fabu_nextQuestionId++,
      //     title: 'fabupublish'+this.fabu_nextQuestionId,
      //     deadline: 'xxxx-xx-xx'+this.fabu_nextQuestionId,
      //     finish_question:'未完成'
      //   });
      //   $('.dropdown').dropdown(); //不可改
      // };
      //



     // this.first_fabu = false;  
      }else {
      }
      setTimeout(function(){ divedePage(que.fabu_questions.length); }, 10);
      $('#jieshou_list').hide();
      $('#fabu_list').show();
      this.isB = true;
      this.isD = false;
    },
    receive:function() {
      this.isFabu = false;
      if(this.first_jieshou){

        axios.post('/manageQuestion/search_author', {creator: localStorage.getItem("username")})
        .then(function (res) {
          _data = res.data;
          console.log(_data);
          while(que.jieshou_questions.length){
            que.jieshou_questions.pop();
          }
          for(var i = 0; i < _data.length; i++) {
            que.jieshou_questions.push({
              ID: _data[i]._id,
              id: que.jieshou_nextQuestionId++,
              title: _data[i].title,
              questionSet: _data[i].questions,
              creator: _data[i].creator ||'zhangsan',
              deadline: _data[i].deadline
            });
            $('.dropdown').dropdown();
          };
        })
        .catch(function (error) {
        console.log(error);
        }); 

      //显示当前用户已接受的问卷
      //search已接受问卷，读取数据
      // for(var j = 0;j <12;j++) {
      //   this.jieshou_questions.push({
      //     id: this.jieshou_nextQuestionId++,
      //     title: 'jieshoureceive'+this.jieshou_nextQuestionId,
      //     deadline: 'xxxx-xx-xx'+this.jieshou_nextQuestionId,
      //     finish_question:'未完成'
      //   });
      //   $('.dropdown').dropdown();
      // };
      //



      this.first_jieshou = false;
      }else {
      }
      setTimeout(function(){ divedePage(que.jieshou_questions.length); }, 10);
      $('#fabu_list').hide();
      $('#jieshou_list').show();
      this.isB = false;
      this.isD = true;
    },
    has_published:function() {
      this.publish();
      this.$nextTick(() => {
        this.temp(1);
        this.$nextTick(() => {
          this.fabu_questions.pop();
          this.fabu_nextQuestionId--;
        }); 
      }); 
    },
    has_received:function() {
      this.receive();
      this.$nextTick(() => {
        this.temp(2);
        this.$nextTick(() => {
          this.jieshou_questions.pop();
          this.jieshou_nextQuestionId--;
        }); 
      }); 
    },
    delete_fabu(){
      setTimeout(function(){ divedePage(que.fabu_questions.length); }, 10);
    },
    delete_jieshou(){
      setTimeout(function(){ divedePage(que.jieshou_questions.length); }, 10);
    },
    change_state:function(index) {
      
      Vue.set(this.jieshou_questions[index],'finish_question','已完成');


      //数据库修改状态为已完成
      //算钱
      //TODO
      //
    }
  }
})

function divedePage(pageCount) {

  $("#pagination").pagination(pageCount,    //分布总数量，必须参数
  {
    
    prev_text: "上一页",
    next_text: "下一页",
    items_per_page:5,
    num_edge_entries: 2,       //两侧首尾分页条目数
    num_display_entries: 6,    //连续分页主体部分分页条目数
    current_page: 0 ,//当前页索引
    callback:function(page_index,jq){
      if(que.isFabu) {
        for(var n = 0; n < pageCount; n++){        
          if(parseInt (n / 5) == page_index){
            $(".fabu.list:eq(" + n +")").show();
          }
          else{
            $(".fabu.list:eq(" + n +")").hide();
          }  
        }
      }
      else {
        for(var n = 0; n < pageCount; n++){        
          if(parseInt (n / 5) == page_index){
            $(".jieshou.list:eq(" + n +")").show();
          }
          else{
            $(".jieshou.list:eq(" + n +")").hide();
          }  
        }
      }
    } //PageCallback() 为翻页调用次函数。
  });
  
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
function first_load() {
  var button_left = document.getElementById('fabu');
  button_left.click();
  var button_right = document.getElementById('jieshou');
 // button_right.click();
  button_left.click();
}
