var vm = new Vue(
{
    el:'#qus-list',
    data:{
	wjtitle:'23333',
    	//问题列表的inHtml信息
    	questionlist:[],
    	//问卷类型
    	questiontype:[],
		questionMix:[],
		//问题题目以及选项，文本题为“”空
        title_list:[
        ],
        // questiontype:[
        // ],
        a_list:[
        ],
        b_list:[
        ],
        c_list:[
        ]
    }
})

vm.wjtitle = $('#wjtitle').val();
console.log(vm.wjtitle);
function switch_button() {

    $('.ui.sidebar').sidebar({
        context: 'body',
        dimPage : false,
        onVisible: function() {
            
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


$(document).ready(function(){
    $('.ui.accordion').accordion({duration:'click'});

});

$('#mycalender').calendar({type: 'date'});

function fabu() {

	var _data = { 
		//creator: 'zhangsan',
		title: $('#wjtitle').val(), 
		questions: vm.questionMix,
		answer: {},
		deadline: $('#timeInput').val()
	  };
	  console.log(_data);
	  axios.post('/createWJ/post_wj', _data)
	  .then(function (response) {
		console.log(response);
	  })
	  .catch(function (error) {
		console.log(error);
	  });
	window.location.href='../page_1/page_1.html'
}
function save() {
	window.location.href='../page_1/page_1.html'
}


function selectSingle() {
	//var title = $('#singletitle').val;
	//if (title == null || title == '') {
	//	$('#singlequs').val="不能为空！";
	//	return;
	//}
	//读取信息
	var mytext = $("#singletitle").val(),
		singlea = $("#singlea").val(),
		singleb = $("#singleb").val(),
		singlec = $("#singlec").val();
		//判断
		if(mytext == '' || singlea == '' || singleb == '' || singlec == ''){
			alert("题目和选项不可为空！");
			return;
		}
		//存储
		vm.title_list.push(mytext);
		vm.a_list.push(singlea);
		vm.b_list.push(singleb);
		vm.c_list.push(singlec);

		vm.questiontype.push(0);
		//html
		var que =
			"<div class='ui form ansarea' >"
			+  "<div class='grouped fields'>"
			  +  "<label>"+mytext+"</label>"
			  +  "<div class='field'>"
			  +    "<div class='ui radio checkbox'>"
			  +      "<input type='radio' checked='checked' name='example"+vm.questionlist.length+"'>"
			  +      "<label>"+singlea+"</label>"
			  +    "</div>"
			  +  "</div>"
			  +  "<div class='field'>"
			  +    "<div class='ui radio checkbox'>"
			  +      "<input type='radio'  name='example"+vm.questionlist.length+"'>"
			  +      "<label>"+singleb+"</label>"
			  +   " </div>"
			  +  "</div>"
			  +  "<div class='field'>"
			     + "<div class='ui radio checkbox'>"
			     +  " <input type='radio'  name='example"+vm.questionlist.length+"'>"
			     +   "<label>"+singlec+"</label>"
			     + "</div>"
			    +"</div>" 
			+"</div>"  
			+"</div>"
			+"<div class='delbtn' onclick='deletethis(this)' id ='"+ vm.questionlist.length +"'>删除</div>";
			//push进列表
			vm.questionlist.push(que);
			console.log('vm.questionmix');
			vm.questionMix.push({title:mytext, ans_a:singlea,ans_b:singleb,ans_c:singlec,qtype:0});  
			console.log(vm.questionMix);
			//显示
			var ans = "";
      for (var i = 0; i <= vm.questionlist.length - 1; i++) {
      	var text = vm.questionlist[i];
      	ans += text;
      }
                    
      var box = document.getElementById("qus-list");
    	box.innerHTML = ans;

    alert("添加单选题成功！");
 
}

function selectMuti(){
		//读取信息
		var mytext = $("#mutititle").val(),
		mutia = $("#mutia").val(),
		mutib = $("#mutib").val(),
		mutic = $("#mutic").val();
		//判断
		if(mytext == '' || mutia == '' || mutib == '' || mutic == ''){
			alert("题目和选项不可为空！");
			return;
		}
		//记录
		vm.title_list.push(mytext);
		vm.a_list.push(mutia);
		vm.b_list.push(mutib);
		vm.c_list.push(mutic);
		vm.questiontype.push(1);
		//html
		var que = "<div class='ui form ansarea'>"
			+  "<div class='grouped fields'>"
			+    "<label>"+mytext+"</label>"
			+    "<div class='field'>"
			+      "<div class='ui checkbox'>"
			+        "<input type='checkbox' checked='checked' name='example"+vm.questionlist.length+"'>"
			+        "<label>"+mutia+"</label>"
			+      "</div>"
			+    "</div>"
			+    "<div class='field'>"
			+      "<div class='ui checkbox'>"
			+        "<input type='checkbox'  name='example"+vm.questionlist.length+"'>"
			+        "<label>"+mutib+"</label>"
			+      "</div>"
			+    "</div>"
			+    "<div class='field'>"
			+      "<div class='ui checkbox'>"
			+        "<input type='checkbox'  name='example"+vm.questionlist.length+"'>"
			+        "<label>"+mutic+"</label>"
			+      "</div>"
			+    "</div> "
			+  "</div>"
			+"</div>"
			+"<div class='delbtn' onclick='deletethis(this)' id ='"+ vm.questionlist.length +"'>删除</div>";
			//push进列表
			vm.questionlist.push(que); 
			vm.questionMix.push({title:mytext, ans_a:mutia,ans_b:mutib,ans_c:mutic,qtype:1});   
			//显示
			var ans = "";
      for (var i = 0; i <= vm.questionlist.length - 1; i++) {
      	var text = vm.questionlist[i];
      	ans += text;
      }
              
      var box = document.getElementById("qus-list");
    	box.innerHTML = ans;
    alert("添加多选题成功！");
}

function selectWenda(){
	var mytext = $("#wendatitle").val();
	//判断
		if(mytext == ''){
			alert("题目不可为空！");
			return;
		}
	vm.title_list.push(mytext);
	vm.a_list.push("");
	vm.b_list.push("");
	vm.c_list.push("");
	vm.questiontype.push(2);
	console.log(vm.questionlist.length);
	var que = "<div class='ui form ansarea wenda' id ='"+ vm.questionlist.length +"'>"
			+"<label class='qustitle'>"+mytext+"</label>"
			+	"<textarea rows='3' placeholder='问答题答案'></textarea>	"
			+"</div>"
			+"<div class='delbtn' onclick='deletethis(this)' id ='"+ vm.questionlist.length +"'>删除</div>";
			console.log(vm.questionlist.length);
	//push进列表
			vm.questionlist.push(que);  
			vm.questionMix.push({title:mytext,qtype:2});  
			//显示
			var ans = "";
      for (var i = 0; i <= vm.questionlist.length - 1; i++) {
      	var text = vm.questionlist[i];
      	ans += text;
      }
              
      var box = document.getElementById("qus-list");
    	box.innerHTML = ans;
    	alert("添加问答题成功！");
}
function deletethis(obj){
	var id = parseInt($(obj).attr('id'));
	for (var i = id; i <= vm.questionlist.length - 1; i++) {
		vm.questionlist[i] = vm.questionlist[i+1];
		vm.questiontype[i] = vm.questiontype[i+1];
		vm.title_list[i] = vm.title_list[i+1];
		vm.a_list[i] = vm.a_list[i+1];
		vm.b_list[i] = vm.b_list[i+1];
		vm.c_list[i] = vm.c_list[i+1];
	}
	vm.title_list.pop();
	vm.a_list.pop();
	vm.b_list.pop();
	vm.c_list.pop();
	vm.questionlist.pop();
	console.log(id);
	//显示
	var ans = "";
      for (var i = 0; i <= vm.questionlist.length - 1; i++) {
      	var text = vm.questionlist[i];
      	ans += text;
      }
              
      var box = document.getElementById("qus-list");
    	box.innerHTML = ans;
}
/*
function deletethislast(){
	
	//存储的上一个问题的数据pop掉
	questionlist.pop();
	var t = questiontype.length-1;
	if (questiontype[t] == 0) {
		sTitle_list.pop();
		sA_list.pop();
		sB_list.pop();
		sC_list.pop();
	}
	else if(questiontype[t] == 1){
		mTitle_list.pop();
		mA_list.pop();
		mB_list.pop();
		mC_list.pop();
	}
	questiontype.pop();
	//显示
	var ans = "";
      for (var i = 0; i <= questionlist.length - 1; i++) {
      	var text = questionlist[i];
      	ans += text;
      }
              
      var box = document.getElementById("qus-list");
    	box.innerHTML = ans;
}
*/



