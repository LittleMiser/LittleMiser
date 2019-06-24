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

      },
      logIn:function (event) {
        var data_ = { 
          myIdentity: "student",
          myContact: this.username,
          myCode: this.password,
        };
        var jum = false;
        // 通过axios获取数据
        axios.post('/index/index.html', data_)
          .then(resp => {
            console.log(data_);
            jum = resp.data.message;
            if(jum == false){
              this.errorMsg = "用户名或密码不正确";
              $(".error").show();
              event.preventDefault();
            }
            else{
                this.errorMsg = "";
                alert("登录成功！");
                $(".error").hide();
                window.location.href='../page_1/page_1.html';
            }
          }).catch(err => {
            console.log('请求失败：'+err.status+','+err.statusText);
            this.errorMsg = "用户名或密码不正确";
            $(".error").show();
            event.preventDefault();
          });

      }
    }
})