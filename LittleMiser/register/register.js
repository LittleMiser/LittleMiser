var _register = new Vue ({
  el : "#register",
  data : {
    username : "",
    password : "",
    nickname : "",
    sname : "",
    snumber : "",
    age : "",
    selected : "",
    grade : "",
    major : "",

    usernameMsg : "",
    passwordMsg : "",
    nicknameMsg : "",
    snameMsg : "",
    ageMsg : "",
    sexMsg : "",
    errorMsg : ""
  },
  methods : {
    checkUsername(){
      if(!(/^1[34578]\d{9}$/.test(this.username)) && 
      !(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(this.username))){
        this.usernameMsg = "请输入正确的邮箱或手机号码";
        return false;
      }
      else{
        this.usernameMsg = "";
        return true;
      }
    },
    checkPassword(){
      if(!/^(\w){6,20}$/.test(this.password)){
        this.passwordMsg = "密码长度为6-20，可包括字母、数字和下划线";
        return false;
      }
      else{
        this.passwordMsg = "";
        return true;
      }
    },
    checkNickname(){
      if(this.nickname.length == 0){
          this.nicknameMsg = "昵称不能为空";
          return false;
      }
      else{
        this.nicknameMsg = "";
        return true;
      }   
    },
    checkSnameNumber(){
      if(this.sname.length == 0 || this.snumber.length == 0){
        this.snameMsg = "请输入姓名和学号";
        return false;
      }
      else if(/[^\d]/.test(this.snumber)){
        this.snameMsg = "请输入正确的学号";
        return false;
      }
      else{
        this.snameMsg = "";
        return true;       
      }    
       
    },
    checkAge(){
      if(/[^\d]/.test(this.age)){
        this.age = "";
        this.ageMsg = "非法的年龄";
        return false;
      }
      else{
        this.ageMsg = "";
         if(this.selected = ""){
          this.sexMsg = "请选择性别";
          return false;
        }
        else{
          this.sexMsg = "";
          return true;
        }
      }
     
    },
    register:function (event) {



      if(this.checkUsername() && this.checkPassword() && this.checkNickname()
          && this.checkSnameNumber() && this.checkAge()){

          var data_ = { 
            myIdentity: "student",
            myContact: this.username,
            myCode: this.password,
            myNickName: this.nickname,
            myName: this.sname,
            myold: this.age,
            myStudentNum: this.snumber,
            mySex: this.selected,
            myGrade: this.grade,
            mymajor: this.major
          };
          // 通过axios获取数据
          axios.post('/register/register.html', data_)
            .then(resp => {
              console.log(data_);
            }).catch(err => {
              console.log('请求失败：'+err.status+','+err.statusText);
            });
              alert("注册成功！");
              $(".error").hide();
              window.location.href='../index/index.html';     
            }
      else{
          this.errorMsg = "请填写正确的必填信息";
          $(".error").show();
          event.preventDefault();
      }
    }
  }
})

function selectStudent(){
  $("#student").show();
  $("#stu").addClass("active");
  $("#stu").removeClass("disable");
  $("#cow").addClass("disable");
  $("#cow").removeClass("active");
}
function selectCow(){
  $("#student").hide();
  $("#stu").addClass("disable");
  $("#stu").removeClass("active");
  $("#cow").addClass("active");
  $("#cow").removeClass("disable");
}

function isEmail(str){
  if(str==null) return;

  var reg = new RegExp();

  return reg.test(str);//检测字符串是否符合正则表达式
}