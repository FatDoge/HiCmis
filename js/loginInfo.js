var stuId;
var stuPwd;
//登录判断
function login(){
	stuId=$("#stuId").val().trim();
	stuPwd=$("#stuPwd").val();
	if(stuId===''||stuPwd===''){
		layer.msg('账户名或密码为空!');
	}else{
	console.log("学号:"+stuId);
	console.log("密码:"+stuPwd);
	// 登录
	//http://182.254.220.141/Public/message/
	$.post("http://182.254.220.141:88/Public/message/",
		{
			"service":"Cmis.Login",
			"username":stuId,
			"passwd":stuPwd,
			 "dataType": 'jsonp',
		},function(data){
			// ret判断
			if(data.ret!=200){
				layer.msg(data.msg);
			}else{
				//插入数据并跳转
				insertInfo();
				getNumbers();
			}
  });
}
}
//跳转
function jump(power){
	switch(power){
		case "0":
			window.location="./stuIndex.html";
			break;
		case "1":
			window.location="./adminIndex.html";
			break;
	}
}

//获取当前用户id
function getId(){
	return localStorage.getItem("stuId");
}
//获取当前用户class
function getClass(){
	return localStorage.getItem("stuClass");
}
//获取当前用户所有信息并存入localStorage
function insertInfo(){
	//先清空
	localStorage.clear();
	var id=stuId;
	console.log(id);
	$.post("http://182.254.220.141:88/Public/message/",
		{
			"service":"Cmis.GetUserInfoById",
			"id":id,
			 "dataType": 'jsonp',
		},function(data){
			// ret判断
			if(data.ret!=200){
				layer.msg(data.msg);
			}else{
				console.log(data);
				//将用户详细信息插入localStorage
				localStorage.setItem("stuId",stuId);
				localStorage.setItem("stuName",data.data.name);
				localStorage.setItem("stuSex",data.data.sex);
				localStorage.setItem("stuClass",data.data.class);
				localStorage.setItem("stuPower",data.data.power);
				localStorage.setItem("stuDetail",data.data.detail);
				jump(data.data.power);
			}
  });
}
//更改头部用户名
function getUsername(){
	return localStorage.stuName;
}
//获取成员信息,返回数组
function getNumbers(){
	var id=localStorage.getItem("stuClass");
	$.post("http://182.254.220.141:88/Public/message/",
		{
			"service":"Cmis.GetClassMembers",
			"id":id,
			 "dataType": 'jsonp',
		},function(data){
			// ret判断
			if(data.ret!=200){
				console.log(data.msg);
			}else{
				console.log(data.data);
				//将用户详细信息插入localStorage
				localStorage.setItem("numberInfo",JSON.stringify(data.data.data));
				console.log("已获取最新成员信息");
				return data.data.data;
			}
  });
}


function KeyDown()
{
  if (event.keyCode == 13)
  {
    event.returnValue=false;
    event.cancel = true;
    login();
  }
}
