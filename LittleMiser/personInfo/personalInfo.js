
function changePasswd() {
    var x = document.getElementById("personalInfo");
    x.innerHTML = 
        "<div id=\"change\">\
            <div  id=\"change_pass\">\
                <form autocomplete=\"on\" action=\"handleChangePasswd\" method=\"POST\">\
                    <div id=\"change_passwd\" class=\"ui form\">\
                        <hr/>\
                        <h5 >修改密码</h5>\
                        <hr/>\
                        <div style=\"height: 200px;\">\
                            <div class=\"field\">\
                                <label for=\"inputAccount\" class=\"sr-only\" style=\"font-size:17px\">当前密码</label>\
                                <input type=\"password\" id=\"currPasswd\" placeholder=\"当前密码\" name=\"currPasswd\" class=\"form-control\" required=\"required\" autofocus/><br/>\
                            </div>\
                            <div class=\"field\">\
                                <label for=\"newPasswd\" class=\"sr-only\" style=\"font-size:17px\">新密码</label>\
                                <input type=\"password\" id=\"newPassword\" placeholder=\"新密码\" name=\"newPasswd\" class=\"form-control\" required/><br/>\
                            </div>\
                            <div class=\"field\">\
                                <label for=\"repeatPasswd\" class=\"sr-only\" style=\"font-size:17px\">确认密码</label>\
                                <input type=\"password\" id=\"repeatPasswd\" placeholder=\"确认密码\" name=\"repeatPasswd\" class=\"form-control\" required/><br/>\
                            </div>\
                        </div>\
                        <div id=\"double_btn2\" align=\"center\">\
                        <div class=\"ui buttons\" >\
                            <button class=\"ui positive button\" type=\"submit\">修改密码</button>\
                                <div class=\"or\"></div>\
                                <button class=\"ui button\" onclick=\"personalInfo()\">取消</button>\
                            </div>\
                        </div>\
                    </div>\
                </form>\
            </div>\
        </div>";
}

function personalInfo() {
    var x = document.getElementById("change");
    x.innerHTML = 
        "<form class=\"ui form\" id=\"all_info\">\
            <div id=\"seven_item\">\
                <hr/>\
                <h5 id=\"info_header\">个人信息</h5>\
                <hr/>\
                <div style=\"height: 200px;\">\
                    <div class=\"field\" id=\"items\">\
                        <div class=\"two fields\">\
                            <div class=\"field\">\
                                <div class=\"field\" id=\"user_name\">用户名:name</div>\
                            </div>\
                            <div class=\"field\">\
                                <div class=\"field\">邮箱：123456@qq.com</div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class=\"field\" id=\"items\">\
                        <div class=\"two fields\">\
                            <div class=\"field\">\
                                <div class=\"field\">姓名：赵钱孙李</div>\
                            </div>\
                            <div class=\"field\">\
                                <div class=\"field\">学号：16340000</div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class=\"field\" id=\"items\">\
                        <div class=\"two fields\">\
                            <div class=\"field\">\
                                <div class=\"field\">年龄：20</div>\
                            </div>\
                            <div class=\"field\">\
                                <div class=\"field\">性别：女</div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class=\"field\" id=\"items\">\
                        <div class=\"two fields\">\
                            <div class=\"field\">\
                                <div class=\"field\">年级：2016级</div>\
                            </div>\
                            <div class=\"field\">\
                                <div class=\"field\">专业：软件工程</div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class=\"field\" id=\"intro\">简介：abcdefg,hijklmn,opq,rs,uvwxyz!!!abcdefg,hijklmn,opq,rs,uvwxyz!!!</div>\
                </div>\
                <a class=\"ui inverted blue button\" onclick=\"changePersonalInfo()\" id=\"changeInfoBtn\" >修改个人信息</a>\
            </div>\
            <div id=\"double_btn\" align=\"center\">\
                <div class=\"ui buttons\">\
                    <button class=\"ui button\" onclick=\"changePasswd()\">修改密码</button>\
                    <div class=\"or\"></div>\
                    <button class=\"ui positive button\" onclick=\"personalInfo()\">个人信息</button>\
                </div>\
            </div>\
        </form>";
}
function changePersonalInfo() {
    var x = document.getElementById("personalInfo");
    x.innerHTML =  
        "<div id=\"change\">\
            <div id=\"change_info\">\
                <form autocomplete=\"on\" action=\"handleChangeInfo\" method=\"POST\" >\
                    <div id=\"change_information\" class=\"ui form\">\
                        <hr/>\
                        <h5>修改个人信息</h5>\
                        <hr/>\
                        <div class=\"field\" id=\"items\">\
                            <div class=\"two fields\">\
                                <div class=\"field\">\
                                    <label for=\"userName\" class=\"sr-only\" style=\"font-size:15px\">用户名</label>\
                                    <input type=\"text\" id=\"nicknamed\" class=\"form-control\" name=\"nicknamed\" value=\"name\" /><br/>\
                                </div>\
                                <div class=\"field\">\
                                    <label for=\"email\" class=\"sr-only\" style=\"font-size:15px\">邮箱</label>\
                                    <input type=\"text\" id=\"email\" class=\"form-control\" name=\"email\" value=\"1234567@qq.com\"/><br/>\
                                </div>\
                            </div>\
                        </div>\
                        <div class=\"field\" id=\"items\">\
                            <div class=\"two fields\">\
                                <div class=\"field\">\
                                    <label for=\"grade\" class=\"sr-only\" style=\"font-size:15px\">年级</label>\
                                    <input type=\"text\" id=\"grade\" class=\"form-control\" name=\"grade\" value=\"2016级\"/><br/>\
                                </div>\
                                <div class=\"field\">\
                                    <label for=\"major\" class=\"sr-only\" style=\"font-size:15px\">专业</label>\
                                    <input type=\"text\" id=\"major\" class=\"form-control\" name=\"major\" value=\"软件工程\"/><br/>\
                                </div>\
                            </div>\
                        </div>\
                        <div class=\"field\" id=\"intro\">\
                            <label for=\"introduction\" class=\"sr-only\"style=\"font-size:15px\">简介</label>\
                            <input type=\"text\" id=\"introduction\" class=\"form-control\" name=\"introduction \" value=\"abcdefg,hijklmn,opq,rs,uvwxyz!!!abcdefg,hijklmn,opq,rs,uvwxyz!!!abcdefg,hijklmn,opq,rs,uvwxyz!!!abcdefg,hijklmn,opq,rs,uvwxyz!!!\"/><br/>\
                        </div>\
                    </div>\
                    <div id=\"double_btn3\" align=\"center\">\
                        <div class=\"ui buttons\" >\
                            <button class=\"ui positive button\" type=\"submit\">修改信息</button>\
                            <div class=\"or\"></div>\
                            <button class=\"ui button\" onclick=\"personalInfo('changeInfo')\">取消</button>\
                        </div>\
                    </div>\
                </form>\
            </div>\
        </div>";
}  