//提交信息，包括职位修改，密码更改
function commitInfo(){
	//开始修改职位
	var power=$("#power").val();
	console.log("职位"+power);
	var oldPwd=$("#oldPwd").val();
	var newPwd1=$("#newPwd1").val();
	var newPwd2=$("#newPwd2").val();
	var id=localStorage.getItem("stuId");
	//判断密码状态并在符合要求时修改
	function judgeChangePwd(){
		if(oldPwd&&newPwd1&&newPwd2&&newPwd1==newPwd2){
			console.log("符合更改密码要求");
			$.post("http://182.254.220.141:88/Public/message/",
			{
				"service":"Cmis.ChangePwd",
				"id":id,
				"usedPwd":oldPwd,
				"newPwd":newPwd1,
				 "dataType": 'jsonp',
			},function(data){
				// ret判断
				if(data.ret!=200){
					alert(data.msg);
				}else{
					layui.use('layer', function(){
						var layer = layui.layer;
						layer.msg('更改成功');
					  });
					console.log(data.data);
					return data.data;
				}
	  });
		}else{
			layui.use('layer', function(){
				var layer = layui.layer;
				layer.msg('不符合密码修改要求');
			  });
		}
	}
	//更改职位
	function changePower(){
		$.post("http://182.254.220.141:88/Public/message/",
			{
				"service":"Cmis.ChangePower",
				"id":id,
				"power":power,
				 "dataType": 'jsonp',
			},function(data){
				// ret判断
				if(data.ret!=200){
					alert(data.msg);
				}else{
					layui.use('layer', function(){
						var layer = layui.layer;
						layer.msg('更改成功');
					  });
					console.log(data.data);
					return data.data;
				}
	  });
	}
	console.log(id);
	switch(power){
		case "0":
		case "1":
		console.log("0或者1");
		changePower();
		judgeChangePwd();
		break;
		case "":
		judgeChangePwd();
		break;
		case undefined:
		judgeChangePwd();
		break;
		default:
		layui.use('layer', function(){
			var layer = layui.layer;
			layer.msg('职位不符合要求');
		  });
		judgeChangePwd();
		break;

	}
}
