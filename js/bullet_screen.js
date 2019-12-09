//自动效果
$(function(){
	var contentArr=['赵*浩购买了FBK课程','藤原拓海购买了FBK课程','工藤新一购买了FBK课程'];
	var runDanMu = function(index){
	 	$.bulletScreen.send(contentArr[index],$('.scorll-title>div'));
	 }
    runOrder();
    function runOrder(){
    	for(var index=0;index<contentArr.length;index++){
	    	(function(j){
	        	 setTimeout(function(){
		            runDanMu(j)
		        },3000*j);
		    })(index);
	    }
	    // 后台持续读取-递归
	    setTimeout(runOrder,contentArr.length*3000);
    }
});
(function($){
    $.bulletScreen={
        timers:[],    //定时数组
        /**
         * 添加弹幕
         * @param odiv 当前弹幕元素
         * @param container 弹幕墙容器
         */
        add:function(odiv,container){
            odiv.css({                          //定义弹幕元素的基本样式
                position:'absolute',
                fontSize:'0.35rem',
                display:'block',
                whiteSpace:'nowrap',
                overflow:'hidden',
                textOverflow:'ellipsis',
                backgroundColor:'#333',
                opacity:'0.5',
                color:'#fff',
                borderRadius:'.3rem',
                height:'.8rem',
                lineHeight:'.8rem',
                paddingLeft:'.4rem',
                paddingRight:'.4rem'
            });
            //产生0-254的数字
//          var r = Math.floor(Math.random() * 254);
//          var g = Math.floor(Math.random() * 254);
//          var b = Math.floor(Math.random() * 254);
            odiv.css({                        //定义弹幕元素的随机样式（top位置,颜色）
//              color: "rgb(" + r + "," + g + "," + b + ")",
//              top: (Math.floor(Math.random() * container.height())-24) + "px",
				top:'0.1rem',
                maxWidth:'4rem',
                right: 0
            });
            container.append(odiv);
            this.move(odiv,container);
        },
        /**
         * 暴露给外层调用的方法
         * @param val 弹幕内容
         * @param container 弹幕墙容器
         */
        send:function(val,container){
            var odiv = $("<div class='bullet'></div>");       //创建弹幕元素
            odiv.html(val);
            this.add(odiv,container);
        },
        /**
         * 定时改变弹幕的位置（right+1）,到达左侧时清除弹幕，清除定时任务
         * @param odiv 当前弹幕元素
         * @param container 弹幕墙容器
         */
        move:function(odiv,container){
            var i = 0;
            var timer = setInterval(function() {
                odiv.css({
                    right: (i += 1) + "px"
                });
                if ((odiv.offset().left + odiv.width()) < container.offset().left) {
                    odiv.remove()
                    clearInterval(timer)
                }
            }, 10);
            this.timers.push(timer);
        },
        /**
         * 等待弹幕
         */
         wait:function(odiv,container){
            var timer = setInterval(function() {
                // odiv.css({
                //     top: "0.3rem"
                // });
                odiv.remove()
            }, 3000);
            this.timers.push(timer);
        },
        /**
         * 清除弹幕墙上的所有弹幕
         * @param container 弹幕墙容器
         */
        clear:function(container){
            for (var i = 0; i < this.timers.length; i++) {  //遍历定时素组，清除所有定时任务
                clearInterval(this.timers[i])
            }
            container.find('.bullet').remove();
        }
    }
})(jQuery);