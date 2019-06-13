var _publish = new Vue ({
  el : "#publish",
  data : {
    name : "",
    phone : "",
    deadline: "",
    address : "",
    money : "",
    getAddress : "",
    postAddress : "",
    info : "",

    nameMsg : "",
    phoneMsg : "",
    addressMsg : "",
    moneyMsg : "",
    getAddressMsg : "",
    postAddressMsg : "",
    infoMsg : "",
    errorMsg : ""
  },
  methods : {
    checkName(){
      if(this.name.length == 0){
          this.nameMsg = "昵称不能为空";
          return false;
      }
      else{
        this.nameMsg = "";
        return true;
      }   
    },
    checkPhone(){
      if(!(/^1[34578]\d{9}$/.test(this.phone))){
        this.phoneMsg = "请输入正确的手机号码";
        return false;
      }
      else{
        this.phoneMsg = "";
        return true;
      }
    },
    
    checkAddress(){
      if(this.address.length == 0){
        this.addressMsg = "请选择你的位置信息";
        return false;
      }
      else{
        this.addressMsg = "";
        if(this.getAddress == ""){
          this.getAddressMsg = "请填写详细的快递领取地址";
          return false;
        }
        else{
          this.getAddressMsg = "";
          return true;
        }
      }    
       
    },
    checkPAddress(){
      if(this.postAddress == ""){
        this.postAddressMsg = "请填写详细的快递送达地址";
        return false;
      }
      else{
        this.postAddressMsg = "";
        return true;
      }
    },
    checkMoney(){
      if(/[^\d]/.test(this.money)){
        this.money = "";
        return false;
      }
      else if(parseFloat(this.money) <= 0.5){
        this.moneyMsg = "报酬不能低于0.5元";
      }
      else{
        this.moneyMsg = "";
        return true;
      }
     
    },
    checkInfo(){
      if(this.info.length == 0){
        this.infoMsg = "请输入物品详情信息";
        return false;
      }
      else{
        this.infoMsg = "";
        return true;
      }
    },
    publish:function (event) {
      this.deadline = $("#timeInput").val();
      console.log(this.deadline);
      if(this.checkName() && this.checkPhone() && this.checkMoney() 
      && this.checkAddress() && this.checkInfo()){
        var data_ = { name: this.name, 
          phone: this.phone, 
          money: parseFloat(this.money),
          deadline: this.deadline,
          address: this.address,
          getAdress: this.getAddress,
          postAddress: this.postAddress,
          info: this.info
        };
        // 通过axios获取数据
        axios.post('/createExpress/createExpress.html', data_)
          .then(resp => {
            console.log(data_);
          }).catch(err => {
            console.log('请求失败：'+err.status+','+err.statusText);
          });
            alert("发布成功！");
            $(".error").hide();
            //window.location.href='../index/index.html';
      }else{
          this.errorMsg = "请补充正确完整的信息";
          $(".error").show();
          event.preventDefault();
      }
    }
  }
})

var prov = document.getElementById('prov');
var city = document.getElementById('city');
var country = document.getElementById('country');


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
      _publish.address = provice[current.prov].name;
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
      _publish.address += '-' + provice[current.prov]["city"][current.city].name;
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
    _publish.address += '-' + provice[current.prov]["city"][current.city].districtAndCounty[current.country];
    _publish.addressMsg = "";
  }
}

$("#timeInput").click(function(){
  if($("#cal").length==0){
     var c = new Calendar();
     $("#calendar").css("height","370px");
  }else{
    $("#cal").remove();
    $("#calendar").css("height","62px");
  } 
});

function switch_button() {

  $('.ui.sidebar').sidebar({
      context: 'body',
      dimPmoney : false,
      onVisible: function() {
          $('body').click(function(e){
            this.unbind(e);
          });
      },
      onShow: function() {
          $('#mypusher').removeClass("dimmed");
          $('.ui.sidebar').css("z-index",999);
          $('#mypusher').css("width","80%");
      },
      onHide: function() {
          $('.ui.sidebar').css("z-index",1);
          $('#mypusher').css("width","100%");
      }
  }).sidebar('toggle');
}