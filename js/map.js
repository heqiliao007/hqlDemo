$(function(){
	function getUrlParam(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	    if (r != null) return unescape(r[2]); return null; //返回参数值
	}
    //初始化地图函数  自定义函数名init
    function init(msg) {
    	var map_center = new qq.maps.LatLng(22.539196,114.049759);
//		var geolocation = new qq.maps.Geolocation("R3PBZ-T4JKU-C44V4-BYF5A-CAGOF-5BBOM", "szwg");
//		function showPosition(position) {
//			map.setCenter(new qq.maps.LatLng(position.lat,position.lng))
//		};
//		function showErr() {
//		};
//		geolocation.getLocation(showPosition, showErr)
        //定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
         var map = new qq.maps.Map(document.getElementById("container"), {
         	disableDefaultUI: true,
            center: map_center,
            zoom:11
        });
	    var cssC = {
	        color: "#171717",
	        fontSize: ".26rem",
	        lineHeight: ".4rem"
	    };
	    var latlngs = {'location':[],'title':[],'id':[]}
	    for(var k=0;k<msg.length;k++){
	    	latlngs.location.push(new qq.maps.LatLng(msg[k].lat,msg[k].lon))
	    	latlngs.title.push(msg[k].name)
	    	latlngs.id.push(msg[k].id)
	    }
	    for(var i = 0;i < latlngs.location.length; i++) {
	        (function(n){
	            var marker = new qq.maps.Label({
	                position: latlngs.location[n],
	                map: map,
	                style: cssC,
	                title:"'"+latlngs.id[n]+"'",
		        	content:latlngs.title[n]
	            });
	            qq.maps.event.addListener(marker, 'click', function() {
	            	var id=$(this).attr('title').replace(/\'/g, "")
	            	$.ajax({
						type: "GET",
						url: ajaxs+"Branch/"+id,
						success: function(msg){
							console.log(msg)
							if($('.branch').length!=0){
			            		$('.branch').remove()
			            	}
			            	CustomOverlay.prototype = new qq.maps.Overlay();
					        //定义construct,实现这个接口来初始化自定义的Dom元素
					        CustomOverlay.prototype.construct = function() {
					            var div = this.div = document.createElement("div");
					            this.div.className = 'branch'
					            this.div.innerHTML = '<div class="site">'+
															'<h3>'+msg.data[0].name+'<img src="img/shut.png"/></h3>'+
															'<p>地址：'+msg.data[0].address+'</p>'+
														'</div>'+
														'<div class="time">'+
															'<img src="img/time.png"/>'+
															'<p>'+msg.data[0].worktime+'&nbsp;</p>'+
														'</div>'+
														'<div class="triangle"></div>';
					            //将dom添加到覆盖物层
					            var panes = this.getPanes();
					            //设置panes的层级，overlayMouseTarget可接收点击事件
					            panes.overlayMouseTarget.append(div);
					            this.div.children[0].children[0].children[0].onclick = function() {
					                overlay.setMap(null);
					            }
					        }
					         //实现draw接口来绘制和更新自定义的dom元素
					        CustomOverlay.prototype.draw = function() {
					            var overlayProjection = this.getProjection();
					            //返回覆盖物容器的相对像素坐标
					            var pixel = overlayProjection.fromLatLngToDivPixel(this.position);
					            var divStyle = this.div.style;
					            var btm=parseInt($('.triangle').css('border-bottom'))*2
					            divStyle.left = pixel.x - $('.branch').width()*(8/11) + "px";
					            divStyle.top = pixel.y - $('.branch').height() - btm + "px";
					            var allx=$('body').width()-$('.branch').width();
					            var x=$('.branch').offset().left-allx/2;
					            var y=$('.branch').offset().top;
//					            console.log(x,y,allx)
					            if(x<0&&y<0||y<0&&x>allx){
					            	map.panBy(x, y);
					            }else if(x<0&&y>0||x>allx&&y>0){
					            	map.panBy(x, 0);
					            }else if(x>0&&y<0&&x<allx){
					            	map.panBy(0, y);
					            }
					        }
					         //实现destroy接口来删除自定义的Dom元素，此方法会在setMap(null)后被调用
					        CustomOverlay.prototype.destroy = function() {
					            this.div.onclick = null;
					            this.div.parentNode.removeChild(this.div);
					            this.div = null
					        }
			            	var latlng = latlngs.location[n];
		    				var overlay = new CustomOverlay(latlng, 0);
			            	overlay.setMap(map);
						},
					});
	           });
	        })(i);
	    };
	    function CustomOverlay(position, index) {
            this.index = index;
            this.position = position;
      };
      function addsite(){
      	var latLngs=getUrlParam('latLng');
      	var id = getUrlParam('id')
      	if(latLngs!=null){
//    		location.replace('url')
      		var latLng=latLngs.split(',')
      		var latlngs=new qq.maps.LatLng(latLng[0],latLng[1])
	    	var id = id
	    	map.setCenter(latlngs)
	    	$.ajax({
				type: "GET",
				url: ajaxs+"Branch/"+id,
				success: function(msg){
					if($('.branch').length!=0){
	            		$('.branch').remove()
	            	}
	            	CustomOverlay.prototype = new qq.maps.Overlay();
			        //定义construct,实现这个接口来初始化自定义的Dom元素
			        CustomOverlay.prototype.construct = function() {
			            var div = this.div = document.createElement("div");
			            this.div.className = 'branch'
			            this.div.innerHTML = '<div class="site">'+
													'<h3>'+msg.data[0].name+'<img src="img/shut.png"/></h3>'+
													'<p>'+msg.data[0].address+'</p>'+
												'</div>'+
												'<div class="time">'+
													'<img src="img/time.png"/>'+
													'<p>'+msg.data[0].worktime+'</p>'+
												'</div>'+
												'<div class="triangle"></div>';
			            //将dom添加到覆盖物层
			            var panes = this.getPanes();
			            //设置panes的层级，overlayMouseTarget可接收点击事件
			            panes.overlayMouseTarget.append(div);
			            this.div.children[0].children[0].children[0].onclick = function() {
			                overlay.setMap(null);
			            }
			        }
			         //实现draw接口来绘制和更新自定义的dom元素
			        CustomOverlay.prototype.draw = function() {
			            var overlayProjection = this.getProjection();
			            //返回覆盖物容器的相对像素坐标
			            var pixel = overlayProjection.fromLatLngToDivPixel(this.position);
			            var divStyle = this.div.style;
			            var btm=parseInt($('.triangle').css('border-bottom'))*2
			            divStyle.left = pixel.x - $('.branch').width()*(8/11) + "px";
			            divStyle.top = pixel.y - $('.branch').height() - btm + "px";
			            var allx=$('body').width()-$('.branch').width();
			            var x=$('.branch').offset().left-allx/2;
			            var y=$('.branch').offset().top;
			            if(x<0&&y<0||y<0&&x>allx){
			            	map.panBy(x, y);
			            }else if(x<0&&y>0||x>allx&&y>0){
			            	map.panBy(x, 0);
			            }else if(x>0&&y<0&&x<allx){
			            	map.panBy(0, y);
			            }
			        }
			         //实现destroy接口来删除自定义的Dom元素，此方法会在setMap(null)后被调用
			        CustomOverlay.prototype.destroy = function() {
			            this.div.onclick = null;
			            this.div.parentNode.removeChild(this.div);
			            this.div = null
			        }
	            	var latlng = latlngs;
					var overlay = new CustomOverlay(latlng, 0);
	            	overlay.setMap(map);
				},
			});
      	}
      }
      addsite()
      //点击弹窗网点地图显示当前网点
      $(document).on('click','.sol-item',function(){
    	var positions=$(this).children('span').html().split(',')
//  	window.location.href = 'map.html?latLng='+positions[0]+','+positions[1]+'&id='+$(this).attr('id');
    	location.replace('map.html?latLng='+positions[0]+','+positions[1]+'&id='+$(this).attr('id'));
    });
    }
    var i=1
    function infowidth(){
    	var now=setInterval(function(){
    		if($('.branch').length!=0){
    			var box=$('.branch').parent().parent();
	    		if(i==4){
	    			box.css('left',parseInt(box.css('left'))-14+'px');
		    		box.css('top',parseInt(box.css('top'))-8+'px');
		    		box.css('width',parseInt(box.css('width'))+28+'px');
		    		box.css('height',parseInt(box.css('height'))+16+'px');
	    			clearInterval(now)
	    			i=1
	    		}
	    		i++
    		}
    	},10)
    };
    $(document).on('click','.area',function(){
    	var top = $(this).position().top
    	console.log(top)
//  	console.log($('#lists').scrollTop())
    	$('#lists').scrollTop(top - 250)
//	  	$("#lists").animate({scrollTop: top});
    	var sol=$(this).siblings('.sol').css('display')
    	$('.area img').css('transform','rotate(0deg)')
    	$('.sol').css('display','none');
    	if(sol=='none'){
    		$(this).siblings('.sol').css('display','block');
    		$(this).children('img').css('transform','rotate(90deg)')
    	}else{
    		$(this).siblings('.sol').css('display','none');
    		$(this).children('img').css('transform','rotate(0deg)')
    	}
    });
    $.ajax({
		type: "GET",
		url: ajaxs+"Branch/All",
		success: function(msg){
			init(msg.data);
			var date=[];
			console.log(date)
			for(var i=0;i<msg.data.length;i++){
				if(i==0){
					date.push({'county':msg.data[i].county,'service':[msg.data[i]]})
				}else{
					for(var j=0;j<date.length;j++){
						if(msg.data[i].county==date[j].county){
							date[j].service.push(msg.data[i])
							break;
						}else if(j==date.length-1){
							date.push({'county':msg.data[i].county,'service':[msg.data[i]]});
							break;
						}
					}
				}
			}
			var news = new Vue({
			el: '#lists',
			data: {
				date:date,
			},
			created:function(){
				
			}
		});
		},
	});
})