$(document).ready(function(){
  var data_ = JSON.parse(localStorage.getItem("paperInfo"));
  console.log(data_);
  
  vm.id = data_.ID;
  vm.wjtitle = data_.title;
  vm.every_pay = data_.every_pay;

  for(var i=0;i<data_.questionSet.length;i++){
    vm.title_list.push(data_.questionSet[i].title);
    vm.questiontype.push(data_.questionSet[i].qtype);
    vm.a_list.push(data_.questionSet[i].ans_a);
    vm.b_list.push(data_.questionSet[i].ans_b);
    vm.c_list.push(data_.questionSet[i].ans_c);
  }
});

Vue.component('single', {
    props: ['id','title','a','b','c'],
    template: '\
            <div class="ui form ansarea" >\
              <div class="grouped fields">\
                <label>{{title}}</label>\
                <div class="field">\
                  <div class="ui radio checkbox">\
                    <input type="radio" :name="id" checked="checked">\
                    <label>{{a}}</label>\
                  </div>\
                </div>\
                <div class="field">\
                  <div class="ui radio checkbox">\
                    <input type="radio" :name="id">\
                    <label>{{b}}</label>\
                  </div>\
                </div>\
                <div class="field">\
                  <div class="ui radio checkbox">\
                    <input type="radio" :name="id">\
                    <label>{{c}}</label>\
                  </div>\
                </div> \
              </div>\
            <div class="ui divider"></div>\
            </div>'

})


Vue.component('double', {
    props: ['id','title','a','b','c'],
    template: '\
            <div class="ui form ansarea">\
        <div class="grouped fields">\
          <label>{{title}}</label>\
          <div class="field">\
            <div class="ui checkbox">\
              <input type="checkbox" :name="id">\
              <label>{{a}}</label>\
            </div>\
          </div>\
          <div class="field">\
            <div class="ui checkbox">\
              <input type="checkbox" :name="id">\
              <label>{{b}}</label>\
            </div>\
          </div>\
          <div class="field">\
            <div class="ui checkbox">\
              <input type="checkbox" :name="id">\
              <label>{{c}}</label>\
            </div>\
          </div> \
        </div>\
        <div class="ui divider"></div>\
      </div>'
})

Vue.component('wenda', {
    props: ['id','title'],
   template: '\
      <div class="ui form ansarea wenda">\
      <label class="wendatitle">{{title}}</label>\
      <textarea :id="id" rows="3" placeholder="问答题答案"></textarea>  \
      <div class="ui divider"></div>\
      </div>'
})

      

vm = new Vue(
{
    el:'#area',
    data:{
        id: 0,
        wjtitle:'',
        title_list:[],
        every_pay: 0,
        questiontype:[],
        a_list:[],
        b_list:[],
        c_list:[],
        answer:[]
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
           $('#mypusher').css("width","85%");
        },
        onHide: function() {
            $('.ui.sidebar').css("z-index",1);
            $('#mypusher').css("width","100%");
        }
    }).sidebar('toggle');
}

function finish(){
  //提取信息,i可以作为题号，console.log输出每个选项的选中情况/问答题答案
  for (i=0;i<vm.questiontype.length;i++) {
    // 提取单选题的答案
    if(vm.questiontype[i] == 0){
      console.log("第"+i+"题：单选");
      ob = document.getElementsByName(i);
      for(j = 0;j < ob.length;j++){
        //获得每个选项的选中情况 true/false
        console.log(j+","+ob[j].checked);
        
      }
      vm.answer.push({ans_a:ob[0].checked,ans_b:ob[1].checked,ans_c:ob[2].checked});
    }
    // 提取多选题的答案
    if(vm.questiontype[i] == 1){
      console.log("第"+i+"题：多选");
       ob = document.getElementsByName(i);
       for(j = 0;j < ob.length;j++){
        //获得每个选项的选中情况
        console.log(j+","+ob[j].checked);

      }
      vm.answer.push({ans_a:ob[0].checked,ans_b:ob[1].checked,ans_c:ob[2].checked});
    }
    // 提取问答题的答案
    if(vm.questiontype[i] == 2){
      console.log("第"+i+"题:问答");
      ans =  $('#'+i).val();
      console.log(ans);
      vm.answer.push({ans_a:ans});
    }
  }
  console.log(vm.answer);
  axios.post('/WJinfo/fill_in', {id:vm.id,ans:vm.answer})
	  .then(function (response) {
		console.log(response);
	  })
	  .catch(function (error) {
		console.log(error);
    });
    alert('问卷填写完成，获得报酬 '+vm.every_pay);

    
    // todo 填写问卷， 当前账户 + vm.every_pay
    var __data = {
      creator: localStorage.getItem("username").split("\"")[1],
      pay: vm.every_pay
    };
    axios.post('/User/createWJ/post_payEvery', __data)
    .then(function (response) {
    })



  //跳转到第一页
  window.location.href='../getQuestion/getQuestion.html'
}
