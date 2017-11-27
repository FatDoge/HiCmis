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

	var url='./studentItems.html';                             //转向网页的地址; 
	var name='选取学生';                            //网页名称，可为空; 
	var iWidth=600;                          //弹出窗口的宽度; 
	var iHeight=600;                         //弹出窗口的高度; 
	//获得窗口的垂直位置 
	var iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
	//获得窗口的水平位置 
	var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; 
	window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no'); 
}