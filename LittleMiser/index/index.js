var _login = new Vue ({
    el : "#login",
    data : {
      username : "",
      password : "",
      
      errorMsg : ""
    },
    methods : {
      checkUsername(){
        if(!(/^1[34578]\d{9}$/.test(this.username)) && 
        !(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(this.username))){
            this.errorMsg = "请输入正确的邮箱或手机号码";
            $(".error").show();
            return false;
        }
        else{
        this.errorMsg = "";
        $(".error").hide();
        return true;
        }
      },
      checkPassword(){
        if(this.password.length < 5){
          this.errorMsg = "用户名或密码不正确";
          $(".error").show();
          return false;
        }
        else{
            $(".error").hide();
            this.errorMsg = "";
            return true;
        }
      },
      logIn:function (event) {
        if(this.checkUsername() && this.checkPassword()){
              alert("登录成功！");
              $(".error").hide();
              window.location.href='../page_1/page_1.html';
        }else{
            this.errorMsg = "用户名或密码不正确";
            $(".error").show();
            event.preventDefault();
        }
      }
    }
})