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
			window.location="./adminIndex.html";
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
			window.location="./stuIndex.html";
		}
		console.log("权限"+adminPower);
		})
	
};

