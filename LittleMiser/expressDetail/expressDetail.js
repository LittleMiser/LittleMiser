$(document).ready(function(){
  var _data = {};
  //
  detail.name = '张三';
  detail.phone = '1234567';
  detail.deadline = '2019-6-20';
  detail.money = '3';
  detail.getAddress = '菜鸟驿站';
  detail.postAddress = '慎五';
  detail.info = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';

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