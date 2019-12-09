;(function($){
	var _this;
	var html="";
	//定义成全局变量
	var custom1={};
	function _showdata(config){
		//console.log(config)
		_this=this;
		var data;
		//3.定义插件的默认参数
		var def={url:"./def.json"};
		
		var set=$.extend({},def,config);
		//删除传入对象的多于值
		delete config.url;
		//console.log(config.url)
		//赋予给一个全局变量
		custom1=config;
		//显示数据
		var iframe=$('<iframe src="'+set.url+'" style="display:none"></iframe>').appendTo("body");
		
		//绑定事件 原生绑定 1.拿取数据
		window.onload=function(){
			//console.log(iframe[0].lastElementChild.contentDocument);
			var initdata=iframe[0].contentDocument;
			//标签转换为jq对象取值 是一个string
			var datastr=$(initdata).find("body").text();
			//转换为对象
			data=JSON.parse(datastr)
			//console.log(data)
			showtable(data);
		}
		return _this;
	}
	//2.接受获取到的数据并且把数据渲染到页面上
	function showtable(data){
		//console.log(data)
		//console.log(data[0].name)
		for(var i in data){
			//console.log(data[i].name)
			html += "<tr>";
			html += "<td>"+data[i].id+"</td>";
			html += "<td>"+data[i].name+"</td>";
			html += "<td>"+data[i].sex+"</td>";
			html += "<td>"+data[i].age+"</td>";
			html += "<td>"+data[i].hobby+"</td>";
			html += "<td>"+data[i].skill+"</td>";
			html += "<td>删除</td>";
			html += "</tr>";
		}
		$(_this).append(html);
		custom();
	}
	//4.实现表格自定义事件的添加
	function custom(){
		//遍历对象，
		$.each(custom1,function(key,value){
		 	//on并且绑定事件 （事件类型 绑定对象 处理函数 ）
		 	//传入的是方法（ 绑在tr上）
		 	console.log(key,value)
			$(_this).on(key,"tr",value)
		})
	}
	$.fn.showdata=_showdata;
})(jQuery);
