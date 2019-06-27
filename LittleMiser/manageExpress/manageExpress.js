 $(document).ready(function(){
  var data = {};
  // 读取JSON数据，存入expresses数组中
  que.has_published();
  divedePage(1);
});


Vue.component('ul_item',  {
  template: '\
    <div class="ui middle aligned animated selection fabu list">\
      <div class="item">\
        <div class="right floated content">\
          <div class="ui teal buttons">\
            <div class="ui top right pointing dropdown icon button">\
              <i class="dropdown icon"></i>\
              <div class="menu transition hidden">\
                <a class="item" v-on:click="gotoDetail"><i class="eye icon"></i>查看详情</a>\
                <div class="item" v-on:click="delete_fabu"><i class="delete icon"></i>删除任务</div>\
              </div>\
            </div>\
          </div>\
        </div>\
        <div>{{address}}<div>{{deadline}}</div></div>\
      </div>\
      <hr/>\
    </div>\
  ',
  props: ['id','address','deadline'],
  methods: {
    gotoDetail: function() {    
      for(var i = 0; i < que.fabu_expresses.length; i++) {
        if (this.id == que.fabu_expresses[i].id) {
          //console.log(this.id);
          localStorage.setItem("express", JSON.stringify(que.fabu_expresses[i]))
          localStorage.setItem("page", JSON.stringify("confirmExpress"))
          window.location.href='../expressDetail/expressDetail.html';
        }
      }
    },
    delete_fabu: function() {
      setTimeout(function(){ divedePage(que.fabu_expresses.length); }, 10);
        var data_ = { 
          id: this.id
        };
        axios.post('/manageExpress/delete', data_)
          .then(resp => {
            console.log("YES");
          }).catch(err => {
            console.log('请求失败：'+err.status+','+err.statusText);
          });
            alert("发布成功！");
            $(".error").hide();   
      location.reload(); 
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
            <div class="ui button">{{finish_express}}</div>\
            <div class="ui top right pointing dropdown icon button">\
              <i class="dropdown icon"></i>\
              <div class="menu transition hidden">\
                <a class="item" v-on:click="gotoDetail"><i class="eye icon"></i>查看详情</a>\
                <div class="item" v-on:click="delete_jieshou"><i class="delete icon"></i>取消任务</div>\
                <div class="item" v-on:click="change_state"><i class="yen sign icon"></i>完成任务</div>\
              </div>\
            </div>\
          </div>\
        </div>\
        <div>{{address}}<div>{{deadline}}</div></div>\
      </div>\
      <hr/>\
    </div>\
  ',
  props: ['id','address','deadline','finish_express'],
  methods: {
    gotoDetail: function() {    
      //window.location.href='../expressDetail/expressDetail.html';
      for(var i = 0; i < que.jieshou_expresses.length; i++) {
        if (this.id == que.jieshou_expresses[i].id) {
          //console.log(this.id);
          localStorage.setItem("express", JSON.stringify(que.jieshou_expresses[i]))
          localStorage.setItem("page", JSON.stringify("confirmExpress"))
          window.location.href='../expressDetail/expressDetail.html';
        }
      }
    },
    change_state: function() {
      //this.finish_express = '已完成';
      this.finish_express = '已完成';
      //Vue.set(this.jieshou_expresses[index],'finish_express','已完成');
      //      
      // for(var i = 0; i < que.jieshou_expresses.length; i++) {
      //   if (this.id == que.jieshou_expresses[i].id) {
          //console.log(que.jieshou_expresses[i]);
          var data_ = { 
            id: this.id,
            //isFinished: true
          };
          axios.post('/manageExpress/finish', data_)
            .then(resp => {
              console.log("YES");
            }).catch(err => {
              console.log('请求失败：'+err.status+','+err.statusText);
            });
              alert("发布成功！");
              $(".error").hide();
      //   }
      // }
    },
    delete_jieshou: function(){
      setTimeout(function(){ divedePage(que.jieshou_expresses.length); }, 10);
      var data_ = { 
        id: this.id
      };
      axios.post('/manageExpress/cancel', data_)
        .then(resp => {
          console.log("YES");
        }).catch(err => {
          console.log('请求失败：'+err.status+','+err.statusText);
        });
          alert("发布成功！");
          $(".error").hide(); 
      location.reload();   
    }
  }
})



var que = new Vue({
  el: '#mypusher',
  data: {
    fabu_expresses: [],
    jieshou_expresses:[],
    fabu_nextExpressId: 0,
    jieshou_nextExpressId:0,
    isA: true,
    isB: true,
    isC: true,
    isD: false,
    first_fabu:true,
    first_jieshou:true,
    isFabu:true,
    finish_express : ''
  },
  

  methods: {
    temp:function(num) {
      if(num == 1) {
        this.fabu_expresses.push({
          id: this.fabu_nextExpressId++,
          address:'fabutemp'+this.fabu_nextExpressId,
          deadline: 'xxxx-xx-xx',
          finish_express: '未完成'
        });
        $('.dropdown').dropdown();
      }else {
        this.jieshou_expresses.push({
          id: this.jieshou_nextExpressId++,
          address:'jieshoutemp'+this.jieshou_nextExpressId,
          deadline: 'xxxx-xx-xx',
          finish_express: '未完成'
        });
        $('.dropdown').dropdown();
      }
    },
    publish:function() {
      this.isFabu = true;
      //显示当前用户已发布的问卷
      if(this.first_fabu) {
        var data = {};
        axios.post('/getExpress/get')
        .then(res => {
          data = res.data;
          for(var i = 0; i < data.length; i++) {
            if (localStorage.getItem('username') == data[i].user) {
              var str = '未完成';
              if (data[i].isFinished) {
                str = '已完成';
              }
              tmp_date = data[i].due_date.slice(0,10);
              this.fabu_expresses.push({
                id: data[i]._id,
                address: data[i].delivery_address,
                author: data[i].contact,
                deadline: tmp_date,
                money: data[i].payment,
                phone: data[i].phone,
                getAddress: data[i].pickup_address,
                loc: data[i].location,
                info: data[i].description,
                isRecepted: data[i].isRecepted,
                isFinished: data[i].isFinished,
                recept_user: data[i].recept_user,
                finish_express: str
              });
            }
            $('.dropdown').dropdown(); //不可改
          };
        })
        .catch(function (error) {
          console.log(error);
        });
      //search已发布,读取数据

      this.first_fabu = false;  
      }else {
      }
      setTimeout(function(){ divedePage(que.fabu_expresses.length); }, 10);
      $('#jieshou_list').hide();
      $('#fabu_list').show();
      this.isB = true;
      this.isD = false;
    },
    receive:function() {
      this.isFabu = false;
      if(this.first_jieshou){
      //显示当前用户已接受的问卷
      //search已接受问卷，读取数据
      var data = {};
        axios.post('/getExpress/get')
        .then(res => {
          data = res.data;
          for(var i = 0; i < data.length; i++) {
            if (localStorage.getItem('username') == data[i].recept_user) {
              //console.log(data[i]);
              var str = '未完成';
              if (data[i].isFinished) {
                str = '已完成';
              }
              tmp_date = data[i].due_date.slice(0,10);
              this.jieshou_expresses.push({
                id: data[i]._id,
                address: data[i].delivery_address,
                author: data[i].contact,
                deadline: tmp_date,
                money: data[i].payment,
                phone: data[i].phone,
                getAddress: data[i].pickup_address,
                loc: data[i].location,
                info: data[i].description,
                isRecepted: data[i].isRecepted,
                isFinished: data[i].isFinished,
                recept_user: data[i].recept_user,
                finish_express: str
              });
            }
            $('.dropdown').dropdown(); //不可改
          };
        })
        .catch(function (error) {
          console.log(error);
        });
      //

      this.first_jieshou = false;
      }else {
      }
      setTimeout(function(){ divedePage(que.jieshou_expresses.length); }, 10);
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
          this.fabu_expresses.pop();
          this.fabu_nextExpressId--;
        }); 
      }); 
    },
    has_received:function() {
      this.receive();
      this.$nextTick(() => {
        this.temp(2);
        this.$nextTick(() => {
          this.jieshou_expresses.pop();
          this.jieshou_nextExpressId--;
        }); 
      }); 
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

function first_load() {
  var button_left = document.getElementById('fabu');
  button_left.click();
  var button_right = document.getElementById('jieshou');
  button_right.click();
  button_left.click();
}