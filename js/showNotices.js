function showNotices(){
	var id=localStorage.getItem("stuId");
	//若有私有通知则优先显示私有，获取公共通知
	function getNotices(){
		$.post("http://182.254.220.141:88/Public/message/",
			{
				"service":"Cmis.ViewNotificationsById",
				"id":id,
				 "dataType": 'jsonp',
			},function(data){
				// ret判断
				if(data.ret!=200){
					alert(data.msg);
				}else{
					//console.log(data.data);
					showPublicNotices(data.data);
					return data.data;
				}
	  });
	}
	//处理通知数组
	function showPublicNotices(noticeArr){
		for(var i=0;i<noticeArr.length;i++){
			console.log(noticeArr[i]);
			var item=noticeArr[i];
			//通知内容，后期实现内容过长截止且提供点击查看全文，预计layer实现iframe弹窗
			var content=item.content;
			//通知时间
			var datetime=item.datetime;
			//通知号
			var notice_id=item.notice_id;
			//是否私有
			var private=item.private;
			//发送者
			var sender=item.sender;
			//通知标题
			var title=item.title;
			// 接受者判断
			switch(private){
				case "0":
				private="全体成员";
				break;
				case "1":
				private=localStorage.getItem("stuName");
				break;
			}
			$("#notices").append(`<div class="notice"><p class="title">${title}</p><p class="sendInfo">from:<span>${sender}</span>&nbsp;@<span>${private}</span>&nbsp;<span>${datetime}</span></p><p class="content">${content}</p></div>`);
		}
	}
	getNotices();
}
showNotices();