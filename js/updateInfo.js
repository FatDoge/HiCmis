var username=new Vue({
	el:'#stuName',
	data:{
		username:localStorage.stuName
	}
})
var power=-1;
// 后台获取用户power
function getPower(){
	var id=localStorage.getItem("stuId");
	$.post("http://182.254.220.141:88/Public/message/",
	{
		"service":"Cmis.GetUserInfoById",
		"id":id,
		"async": false,
		"dataType": 'jsonp',
	},function(data){
		// ret判断
		if(data.ret!=200){
			console.log(data.data.msg);
		}else{
			power=data.data.power;
			console.log(power);
			console.log(data.data.power);
		}
			})
}
// 用户权限判断
function judgeUserPower(){
	var id=localStorage.getItem("stuId");
	$.post("http://182.254.220.141:88/Public/message/",
	{
		"service":"Cmis.GetUserInfoById",
		"id":id,
		"async": false,
		"dataType": 'jsonp',
	},function(data){
		// ret判断
		if(data.ret!=200){
			console.log(data.data.msg);
		}else{
			power=data.data.power;
			console.log(power);
			console.log(data.data.power);
		}
		var userPower=power;
		console.log("当前用户权限"+userPower);
		if(userPower==="1"){
			layui.use('layer', function(){
				var layer = layui.layer;
				layer.msg('权限错误，将返回对应主页。');
			  });
			window.location="./adminIndex.html";
		}else if(userPower===-1){
			layui.use('layer', function(){
				var layer = layui.layer;
				layer.msg('登录失效，请重新登录！');
			  });
			window.location="./index.html";
		}
			})
	// userPower:0,string
	
};
function judgeAdminPower(){
	console.log("判断用户权限");
	// adminPower:1,string
	var id=localStorage.getItem("stuId");
	$.post("http://182.254.220.141:88/Public/message/",
	{
		"service":"Cmis.GetUserInfoById",
		"id":id,
		"async": false,
		"dataType": 'jsonp',
	},function(data){
		// ret判断
		if(data.ret!=200){
			console.log(data.data.msg);
		}else{
			power=data.data.power;
			console.log(power);
			console.log(data.data.power);
		}
		var adminPower=power;
		console.log("当前用户权限"+adminPower);
		if(adminPower==="0"){
			layui.use('layer', function(){
				var layer = layui.layer;
				layer.msg('权限错误，将返回对应主页。');
			  });
			window.location="./stuIndex.html";
		}else if(adminPower===-1){
			layui.use('layer', function(){
				var layer = layui.layer;
				layer.msg('登录失效，请重新登录！');
			  });
			window.location="./index.html";
		}
		console.log("权限"+adminPower);
		})
	
};

