function commitNotice(){
	console.log("提交通知...");
	var radios=document.getElementsByName("student");
	var title=$("#title").val();
	var content=$("#noticeContent").val();
	var sender=localStorage.getItem("stuName");
	if(!title.trim()||!content.trim()){
		alert("标题或正文未填写完整");
		return false;
	}
	//默认发向全体
	function noticeAll(){
		$.post("http://182.254.220.141:88/Public/message/",
			{
				"service":"Cmis.SendNotification",
				"title":title,
				"sender":sender,
				"toId":0,
				"content":content,
				 "dataType": 'jsonp',
			},function(data){
				// ret判断
				if(data.ret!=200){
					alert(data.msg);
				}else{
					alert("提交成功！");
					console.log(data.data);
					return data.data;
				}
	  });
	}
	//发送给部分成员
	function noticeSome(){
		console.log("发送给部分成员");
		var sendItem=JSON.parse(localStorage.getItem("sendItem"));
		for(var i=0;i<sendItem.length;i++){
			$.post("http://182.254.220.141:88/Public/message/",
			{
				"service":"Cmis.SendNotification",
				"title":title,
				"sender":sender,
				"toId":sendItem[i].student_id,
				"content":content,
				 "dataType": 'jsonp',
			},function(data){
				// ret判断
				if(data.ret!=200){
					alert(data.msg);
				}else{
					alert("提交成功！");
					console.log(data.data);
					return data.data;
				}
	  });
		}
	}
	for(var i=0;i<radios.length;i++){
		if(radios[i].checked){
			var radioValue=radios[i].value;
			console.log(radioValue);
			switch(radioValue){
				case "0":
				noticeAll();
				break;
				case "1":
				noticeSome();
				break;
				default:
				console.log("失败");
				break;
			}
		}
	}
}

function selectMore(){
	console.log("选取学生");
	//页面层
	window.open("./studentItems.html");
}