$(document).ready(function(){
  divedePage(1);
});


//快递信息
Vue.component('express-item', {
  template: '\
      <div class="black card">\
        <div class="content">\
          <div class="tiny header">领取地址：{{ address }}\</div>\
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
  
var exp = new Vue({
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
      });
      setTimeout(function(){ divedePage(exp.expresses.length); }, 300);
      this.newExpressText = ''
    }
  }
})

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
  for(var i = 0; i < exp.expresses.length; i++){
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
  window.location.href='../getQuestion/getQuestion.html'
}

//加载城市选项
var prov = document.getElementById('prov');
var city = document.getElementById('city');
var country = document.getElementById('country');
var address = '';

/*用于保存当前所选的省市区*/
var current = {
  prov: '',
  city: '',
  country: ''
};

/*自动加载省份列表*/
(function showProv() {
  var len = provice.length;
  for (var i = 0; i < len; i++) {
      var provOpt = document.createElement('option');
      provOpt.innerText = provice[i]['name'];
      provOpt.value = i;
      prov.appendChild(provOpt);
  }
})();

/*根据所选的省份来显示城市列表*/
function showCity(obj) {
  var val = obj.options[obj.selectedIndex].value;
  if (val != current.prov) {
      current.prov = val;
      address = provice[current.prov].name;
      console.log(address);
  }
  //console.log(val);
  if (val != null) {
      city.length = 1;
      var cityLen = provice[val]["city"].length;
      for (var j = 0; j < cityLen; j++) {
          var cityOpt = document.createElement('option');
          cityOpt.innerText = provice[val]["city"][j].name;
          cityOpt.value = j;
          city.appendChild(cityOpt);
      }
  }
}

/*根据所选的城市来显示县区列表*/
function showCountry(obj) {
  var val = obj.options[obj.selectedIndex].value;
  current.city = val;
  if (val != null) {
      country.length = 1; //清空之前的内容只留第一个默认选项
      address += '-' + provice[current.prov]["city"][current.city].name;
      console.log(address);
      var countryLen = provice[current.prov]["city"][val].districtAndCounty.length;
      if (countryLen == 0) {
          return;
      }
      for (var n = 0; n < countryLen; n++) {
          var countryOpt = document.createElement('option');
          countryOpt.innerText = provice[current.prov]["city"][val].districtAndCounty[n];
          countryOpt.value = n;
          country.appendChild(countryOpt);
      }
  }
}

/*选择县区之后的处理函数*/
function selecCountry(obj) {
  current.country = obj.options[obj.selectedIndex].value;
  if ((current.city != null) && (current.country != null)) {
    address += '-' + provice[current.prov]["city"][current.city].districtAndCounty[current.country];
  }
  console.log(address);
}