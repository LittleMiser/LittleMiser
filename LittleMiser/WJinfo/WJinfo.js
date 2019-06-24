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
        wjtitle:'问卷调查',
        title_list:['今天星期一','今天星期二','今天星期三','今天星期四','今天星期五'],
        questiontype:[0,0,1,2,1],
        a_list:[
        'e','e1','e2','','ee'
        ],
        b_list:[
         'e','e1','e2','','ee'
        ],
        c_list:[
         'e','e1','e2','','ee'
        ]
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
      
    }
    // 提取多选题的答案
    if(vm.questiontype[i] == 1){
      console.log("第"+i+"题：多选");
       ob = document.getElementsByName(i);
       for(j = 0;j < ob.length;j++){
        //获得每个选项的选中情况
        console.log(j+","+ob[j].checked);

      }
    }
    // 提取问答题的答案
    if(vm.questiontype[i] == 2){
      console.log("第"+i+"题:问答");
      ans =  $('#'+i).val();
      console.log(ans);
    }
  }
  //跳转到第一页
  //window.location.href='../page_1/page_1.html'
}
