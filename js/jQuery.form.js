;(function($){
	var _this;
	$.fn.checkform=function(){
		_this=this;
		
		_this.on("submit",function(){
			//1.完成非空验证
			//自定义验证:用于保存验证的类型 required
			var jihe=_this.find("input[check]");
			var flag=true;
			$.each(jihe,function(key,value){
				var type=$(value).attr("check");
				//console.log($(value).attr("check"));
				//console.log(_this.find("input[check]").attr("check"))
				if(type==="required"){
					if($(value).val()==""){
						$(this).css("border","1px solid red");
						flag=false;
					}else{
						$(this).css("border","1px solid #CCC");
					}
				};
				//2.正则表达式
				//[0-9a-z]+@[0-9a-z]+\.[a-z]{2,6}
				if(type ==="rule"){
					console.log("haha")
					var reg = /[0-9a-z]+@[0-9a-z]+\.[a-z]{2,6}/i;
					if(reg.test($(value).val())){
						$(this).css("border","1px solid #CCC");
					}else{
						$(this).css("border","1px solid red");
						flag=false;
					}
				};
				//3. 实现复杂校验
				if(type === "complex"){
					var len = $(value).attr("rule");
					console.log(len);
					//转换成数组
					var arr=len.split("-");
					console.log(arr);
					//密码最少6位，最多12位
					if ($(value).val().length>=arr[0]&&(value).val().length<=arr[1]) {
						$(this).css("border","1px solid #ccc");
					}else{
						$(this).css("border","1px solid red");
						flag = false;
					}
				}
			})
			
			return flag;
		})
	}
	
	
	
})(jQuery)

