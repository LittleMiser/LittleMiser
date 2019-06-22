$(document).ready(function(){
  var data_ = JSON.parse(localStorage.getItem("express"));
  //
  detail.name = data_.author;
  detail.phone = data_.phone;
  detail.deadline = data_.deadline;
  detail.money = data_.money;
  detail.getAddress = data_.getAddress;
  detail.postAddress = data_.address;
  detail.info = data_.info;
});

var detail = new Vue ({
    el : '#box',
    data : {
        name : '',
        phone : '',
        deadline: '',
        money : '',
        getAddress : '',
        postAddress : '',
        info : ''
    },
    methods: {
        //确认收货
        confirm_receipt:function (event) {

        }
    }
})