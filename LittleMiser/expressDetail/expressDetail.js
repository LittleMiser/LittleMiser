$(document).ready(function(){
  var skip = JSON.parse(localStorage.getItem("page"));
  if (skip == "getExpress") {
    document.getElementById('changeInfoBtn').innerText = "领取";
  }
  var data_ = JSON.parse(localStorage.getItem("express"));
  //
  detail.id = data_.id;
  detail.name = data_.author;
  detail.phone = data_.phone;
  detail.deadline = data_.deadline;
  detail.money = data_.money;
  detail.getAddress = data_.getAddress;
  detail.postAddress = data_.address;
  detail.info = data_.info;
  detail.isRecepted = data_.isRecepted,
  detail.isFinished = data_.isFinished,
  detail.recept_user = data_.recept_user
});

var detail = new Vue ({
    el : '#box',
    data : {
      id : '',
      name : '',
      phone : '',
      deadline: '',
      money : '',
      getAddress : '',
      postAddress : '',
      info : '',
      isRecepted : '',
      isFinished : '',
      recept_user : ''
    },
    methods: {
      //确认收货
      confirm_receipt:function (event) {
        var username = localStorage.getItem("username");
        var data_ = { 
          id: this.id,
          user: username
        };
        if (document.getElementById('changeInfoBtn').innerText == "领取") {
          var nowtime = new Date();
          var deadtime = new Date(this.deadline);
          if(deadtime.getTime() >= nowtime.getTime()){
            //alert('问卷已过截止时间');
            axios.post('/expressDetail/takeExpress', data_)
            .then(resp => {
              console.log(data_);
            }).catch(err => {
              console.log('请求失败：'+err.status+','+err.statusText);
            });
              alert("发布成功！");
              $(".error").hide();
          }
          else{
            alert('问卷已过截止时间');
          }
        }
        else {
          // Transaction
        }
      }
    }
})