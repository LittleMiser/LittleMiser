Vue.component('question-item', {
  template: '\
    <div class="ui message">\
      <h3 class="header"> {{ id }}. {{ type }}题： {{ topic }}</h3>\
      <div class="chart"></div>\
    </div>\
  ',
  props: ['id', 'topic', 'type']
})
  
function drawChart(index, question){
  // 指定图表的配置项和数据
  if(question.type == '单选'){
    var res = [];
    for (var i = 0; i < question.options.length; i++) {
      res.push({value:question.answers[i], name:question.options[i]});
    }
    
    var option = {
      legend: {
          orient : 'vertical',
          x : 'left',
          data: question.options
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      calculable : true,
      series : [
          {
              name:'单选统计',
              type:'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data: res
          }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
  var myChart = echarts.init($(".chart")[index]);
  myChart.setOption(option);
  }
  else if(question.type == '多选'){
    option = {
      tooltip : {
          trigger: 'axis'
      },
      legend: {
        data:['选择次数']
      },
      calculable : true,
      xAxis : [
        {
          type : 'value',
          boundaryGap : [0, 0.01]
        }
      ],
      yAxis : [
          {
              type : 'category',
              data: question.options
          }
      ],
      series: [{
        name: '选择次数',
        type: 'bar',
        data: question.answers
      }]
  };
  // 使用刚指定的配置项和数据显示图表。
  var myChart = echarts.init($(".chart")[index]);
  myChart.setOption(option);
  }
  else if(question.type == '文本'){
    var myChart = $(".chart")[index];
    for(var i = 0; i < question.answers.length; i++){
      var text = "<div class='ui green message'>回答" + (i+1) + ":   " + question.answers[i] + "</div>"; 
      myChart.innerHTML += text;
    }
    $(".chart:eq("+ index + ")").css("height","auto");
  }
}

new Vue({
  el: '#results',
  data: {
    title : "问卷test",
    questions: [
      {
        id: 1,
        topic: 'Do the dishes',
        type: '单选',
        options: ['选项1', '选项2', '选项3'],
        answers: [10, 20, 30]
      },
      {
        id: 2,
        topic: 'Take out the trash',
        type: '多选',
        options: ['选项3', '选项3', '选项2'],
        answers: [10, 20, 30]
      },
      {
        id: 3,
        topic: 'Mow the lawn',
        type: '文本',
        options: [],
        answers: ['aaaaaaaaaaa', 'bbbbbbbbb', 'cccccccccc']
      }
    ],
    deadline: '2019.6.12'
  },
  mounted(){
    for(var i = 0; i < this.questions.length; i++){
      console.log();
      drawChart(i, this.questions[i]);
    }
    
  }
  
})




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
  console.log('return');
}
