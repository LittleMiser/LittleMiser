 $(document).ready(function(){
  var data = {};
  // 读取JSON数据，存入expresses数组中


    var data_ = { 
      myContact: localStorage.getItem("username").split("\"")[1]
    };

    axios.post('/User/personalInfo/personalInfo.html', data_)
      .then(res => {
        data = res.data;
        per.user_name= data[0].NickName;
        per.money = data[0].Money;
        per.real_name = data[0].Name;
        per.number= data[0].StudentNum;
        per.age= data[0].old;
        per.gender= data[0].Sex;
        per.grade= data[0].Grade;
        per.major= data[0].Major;
        per.intro= data[0].Contact;
        per.correctPasswd= data[0].Code;

        per.personalInfo();
        console.log(data_);
        }).catch(err => {
            console.log('请求失败：'+err.status+','+err.statusText);
          });

});

var per = new Vue({ 
    el: '#box',
    data: {
        user_name: '',
        money: '',
        real_name: '',
        number: '',
        age: '',
        gender:'',
        grade:'',
        major:'',
        intro:'',
        correctPasswd:'',

        oldPasswd:'',
        newPasswd :'',
        confirmPasswd:'',
        new_name:'',
        new_age:'',
        new_grade:'',
        new_major:'',
        new_intro:'',

        left_button:'修改密码',
        right_button:'个人信息',

        passwordMsg : ''
    },

    methods: {
        left_button_click:function() {
            if(this.left_button == '修改密码') {
                this.changePasswd();
            }else if (this.left_button == '提交密码') {
                this.submit_changePasswd();
            }else {
                this.submit_changePersonalInfo();
            }
        },
        right_button_click:function() {
            this.personalInfo();
        },
        personalInfo:function() {
            $('#change_pass').hide();
            $('#change_info').hide();
            $('#seven_item').show();
            $('#button_left').removeClass('positive');
            $('#button_right').addClass('positive');
            this.right_button = '个人信息';
            this.left_button = '修改密码';
        },
        changePersonalInfo:function() {
            $('#change_pass').hide();
            $('#change_info').show();
            $('#seven_item').hide();
            this.right_button = '取消';
            this.left_button = '提交信息';
            this.new_name = this.user_name;
            this.new_age = this.age;
            this.new_grade = this.grade;
            this.new_major = this.major;
            this.new_intro = this.intro;
            changePositive();
        },
        changePasswd:function() {
            $('#change_pass').show();
            $('#change_info').hide();
            $('#seven_item').hide();
            this.right_button = '取消';
            this.left_button = '提交密码';
            this.oldPasswd = '';
            this.newPasswd = '';
            this.confirmPasswd = '';
            changePositive();
        },
        submit_changePasswd:function() {
            if(this.oldPasswd == this.correctPasswd) {
                if(this.checkPassword()) {
                    if(this.newPasswd == this.confirmPasswd) {
                        this.correctPasswd = this.newPasswd;



                        //数据库修改密码
                        //TODO
                        //
                        var __data = {
                          creator: localStorage.getItem("username").split("\"")[1],
                          type: "Code", 
                          content: this.newPasswd
                        };
                        axios.post('/User/personalInfo/updateCode', __data)
                        .then(function (response) {
                        })

                        alert("修改密码成功");
                        this.personalInfo();
                    }
                    else {
                        alert("确认密码与新密码不符，请重新确认");
                        this.oldPasswd = '';
                        this.newPasswd = '';
                        this.confirmPasswd = '';
                    }
                }
                else {index
                    alert("密码格式不符，请重新输入！");
                    this.oldPasswd = '';
                    this.newPasswd = '';
                    this.confirmPasswd = '';
                }
            }
            else {
                alert("原始密码错误，请重新输入！");
                this.oldPasswd = '';
                this.newPasswd = '';
                this.confirmPasswd = '';
            }
        },
        submit_changePersonalInfo:function() {
            this.user_name = this.new_name;
            this.age = this.new_age;
            this.grade = this.new_grade;
            this.major = this.new_major;
            this.intro = this.new_intro;


            //数据库修改信息
            //TODO
            //
            var __data = {
              creator: localStorage.getItem("username").split("\"")[1],
              Nickname: this.new_name,
              Old: this.new_age,
              Grade : this.new_grade,
              Major : this.new_major
            };
            axios.post('/User/personalInfo/updatePersonal', __data)
            .then(function (response) {
            }).catch(err => {
            console.log('请求失败：'+err.status+','+err.statusText);
          });


        },
        checkPassword:function(){
            if(!/^(\w){6,20}$/.test(this.newPasswd)){
                this.passwordMsg = "密码长度为6-20，可包括字母、数字和下划线";
                return false;
            }
            else{
                this.passwordMsg = '';
                return true;
            }
        }
    }
});

function changePositive() {
    $('#button_left').addClass('positive');
    $('#button_right').removeClass('positive');
}

