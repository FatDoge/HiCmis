function initList(){
	console.log("生成学生列表");
	var allInfo=JSON.parse(localStorage.getItem("numberInfo"));
	for(var index in allInfo){
	//删除JSON属性
	delete allInfo[index].sex;
	delete allInfo[index].class;
	delete allInfo[index].power;
	delete allInfo[index].detail;
	}
	localStorage.setItem("studentList",JSON.stringify(allInfo));
	console.log(allInfo);
}

function getCheckData(){ //获取选中数据
	var table = layui.table;
    	console.log("获取选中数据");
      var checkStatus = table.checkStatus('stuNumbers')
      ,data = checkStatus.data;
      localStorage.setItem("sendItem",JSON.stringify(data));
      window.close();
}