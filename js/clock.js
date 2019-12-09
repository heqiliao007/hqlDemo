// 展开蒙层
$(document).on('click','.file-img',function(){
	var img_urls=$(this).attr('data-img');
	$('.mask').show();
	$('.mask-contents').html('');
	$('.mask-contents').append('<img src="'+img_urls+'"/>')
})
//关闭蒙层
$('.mask-down').click(function(){
	$('.mask').hide()
})
// 等待旋转
var times;
function ratote(){
	var du=1;
	times=setInterval(function(){
		$('.waits .file-wait').css('transform','rotate('+du+'deg)');
		if(du==360){
			du=1
		}else{
			du++;
		}
	},5)
}
$.ajax({
	type: "POST",
	url: ctx+"/api/studentRecordApiController/recordController?userId="+userid+"&courseId="+courseId,
	success: function(msg){
		console.log(msg);
		var clockInTip=msg.data.studyRecordDayVoList;
		//var today=new Date();
		//var todayDate=new Date(today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()).getTime()
		var clickDate = formatDate(day);
		$('.day p').html('DAY '+new Date(clickDate).getDate());
		for(var i=0;i<clockInTip.length;i++){
			if(clockInTip[i].startDate==day){
				$('.theme-details').html(clockInTip[i].clockInTip)
			}
		}
	}
})
//上传文件
var imgLen = 0;//已上传图片数量
var indexLayer='';
$(document).on('change','.icons input',function(){
	indexLayer = layer.load(0, {
		shade: [0.1,'#000'] //0.1透明度的白色背景
	});
	// alert($(this)[0].files[0].name);
	// ratote();
	// $('.file-wait').show();
	// window.formData = new FormData($(this)[0].files[0]);
	// window.fileNmae=$(this)[0].files[0].name;
	// window.fileSize=($(this)[0].files[0].size/(1024 * 1024)).toFixed(2) + "MB";
	//window.suffix=fileNmae.split('.').pop().toLowerCase();
	/*if(suffix=='jpg'||suffix=='png'||suffix=='gif'||suffix=='jpeg'){
		if(imgLen == 9){
			layer.msg("图片最多上传9张！");
			return;
		}
	}*/

	$("#fileForm").submit().resetForm();
});

var widthItem = parseInt($(".file-ok").width()) * 0.3;

$("#fileForm").ajaxForm({
	dataType: "json",
	success: function(msg){
		console.log(msg)
		var suffix= msg.data[0].name.split('.').pop().toLowerCase();
		if(msg.code==0){
			//图片
			var fileName = msg.data[0].name;
			var img_urls=msg.data[0].url;
			if(suffix=='jpg'||suffix=='png'||suffix=='gif'||suffix=='jpeg'){
				imgLen++;
				$('.file-ok').append('<div class="file-img" data-img="'+img_urls+'" accessoryid='+msg.data[0].id+' suffix='+suffix+'>'+
					'<span><img src="'+msg.data[0].url+'"/>'+
					'	<img src="'+ctxSta+'/mobile/fdsm/img/down-file.png" class="file-delect"/></span>'+
					/*'<p class="file-name">'+fileName+'</p>'+*/
					/*'<p class="file-size">'+fileSize+'</p>'+*/
					'</div>')
				// clearInterval(times);
				// $('.file-wait').hide();
				//视频
			}else if(suffix=='mp4'){
				$('.file-ok').append('<div class="file-video" accessoryid='+msg.data[0].id+'>'+
					'<span><video src="'+msg.data[0].url+'" poster="'+msg.data[0].videoImgUrl+'"></video>' +
					'	<img src="'+ctxSta+'/mobile/fdsm/img/down-file.png" class="file-delect"/>' +
					'	<img src="'+ctxSta+'/mobile/fdsm/img/clickplay.png" class="file-play"/>' +
					'</span>'+
					/*'<span><video src="'+msg.data[0].url+'" height="'+widthItem+'"></video>' +
					'	<img src="'+ctxSta+'/mobile/fdsm/img/down-file.png" class="file-delect"/>' +
					'	<img src="'+ctxSta+'/mobile/fdsm/img/clickplay.png" class="file-play"/>' +
					'</span>'+*/
					/*'<p class="file-name">'+fileNmae+'</p>'+
					'<p class="file-size">'+fileSize+'</p>'+*/
					'</div>')
				// clearInterval(times);
				// $('.file-wait').hide();
			}else if(suffix=='mov'){
				$('.file-ok').append('<div class="file-video" accessoryid='+msg.data[0].id+'>'+
					'<span><video src="'+msg.data[0].url+'" poster="'+msg.data[0].videoImgUrl+'"></video>' +
					'	<img src="'+ctxSta+'/mobile/fdsm/img/down-file.png" class="file-delect"/>' +
					'	<img src="'+ctxSta+'/mobile/fdsm/img/clickplay.png" class="file-play"/>' +
					'</span>'+
					'</div>')
				//音频
			}else if(suffix== 'mp3'){
				$('.file-ok').append('<div class="file-voice" accessoryid='+msg.data[0].id+'>'+
					'<span><img src="'+ctxSta+'/mobile/fdsm/img/play-3.png"/><img src="'+ctxSta+'/mobile/fdsm/img/down-file.png" class="file-delect"/></span>'+
					'<p class="file-name">'+fileName+'</p>'+
					/*'<p class="file-size">'+fileSize+'</p>'+*/
					'</div>')
				// clearInterval(times);
				// $('.file-wait').hide();
				//pdf文件
			}else if(suffix=='pdf'){
				$('.file-ok').append('<div class="file-doc" accessoryid='+msg.data[0].id+'>'+
					'<span><img src="'+ctxSta+'/mobile/fdsm/img/pdf.png"/><img src="'+ctxSta+'/mobile/fdsm/img/down-file.png" class="file-delect"/></span>'+
					'<p class="file-name">'+fileName+'</p>'+
					'</div>')
				// clearInterval(times);
				// $('.file-wait').hide();
				//word文档
			}else if(suffix=='doc'||suffix=='xml'||suffix=='docx'||suffix=='dot'){
				$('.file-ok').append('<div class="file-doc" accessoryid='+msg.data[0].id+'>'+
					'<span><img src="'+ctxSta+'/mobile/fdsm/img/word-big.png"/><img src="'+ctxSta+'/mobile/fdsm/img/down-file.png" class="file-delect"/></span>'+
					'<p class="file-name">'+fileName+'</p>'+
					/*'<p class="file-size">'+fileSize+'</p>'+*/
					'</div>')
				// clearInterval(times);
				// $('.file-wait').hide();
				//excel表格
			}else if(suffix=='xlsx'||suffix=='xls'||suffix=='xltx'){
				$('.file-ok').append('<div class="file-doc" accessoryid='+msg.data[0].id+'>'+
					'<span><img src="'+ctxSta+'/mobile/fdsm/img/excel.png"/><img src="'+ctxSta+'/mobile/fdsm/img/down-file.png" class="file-delect"/></span>'+
					'<p class="file-name">'+fileName+'</p>'+
					'</div>')
				// clearInterval(times);
				// $('.file-wait').hide();
				//其他文件
			}else{
				$('.file-ok').append('<div class="file-doc" accessoryid='+msg.data[0].id+'>'+
					'<span><img src="'+ctxSta+'/mobile/fdsm/img/text.png"/><img src="'+ctxSta+'/mobile/fdsm/img/down-file.png" class="file-delect"/></span>'+
					'<p class="file-name">'+fileName+'</p>'+
					'</div>')
				// clearInterval(times);
				// $('.file-wait').hide();
			}
			layer.close(indexLayer);
		}else{
			layer.msg('上传失败');
			layer.close(indexLayer);
		}
		return false;
	}
});
//删除上传的文件
$(document).on('click','.file-delect',function(event){
	event.stopPropagation();
	$(this).parent().parent().remove();
	let imgSuffix = $(this).parent().parent().attr("suffix");
	if(imgSuffix=='jpg'||imgSuffix=='png'||imgSuffix=='gif'||imgSuffix=='jpeg'){
		imgLen--;
	}
})
//修改按钮
$('.text textarea').on('keyup',function(){
	this.value=this.value.replace(/^ +| +$/g,'');
	$('.words').html(this.value.length+'/1000');
	if(this.value.length!=0){
		$('.to-clock').addClass('clock')
	}else{
		$('.to-clock').removeClass('clock')
	}
})

function getTime(){
	Y = date.getFullYear() + '-';
	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	D = date.getDate();
	return Y+M+D;
}

//格式化时间戳
function formatDate(date) {
	var now = new Date(date);
	var y=now.getFullYear();
	var m=now.getMonth()+1;
	var d=now.getDate();
	return y+"-"+m+"-"+d;
}


$(document).on('click','.clock',function(){
	var files = $(".file-ok>div");
	var dataLibraryId = "";
	for(var i=0;i<files.length;i++){
		dataLibraryId += $(files[i]).attr("accessoryid")+",";
	}
	var clockdata={'userId':userid,'courseId':courseId,'recordContent':$('.text textarea').val(),'day':formatDate(day),"dataLibraryIds":dataLibraryId}
	$.ajax({
		type: 'POST',
		url: ctx+"/api/studentRecordApiController/saveRecord",
		data: clockdata,
		success : function(data) {
			console.log(data)
			var index = layer.open({
				content: data.msg,
				btn: ['确定', '关闭'],
				yes: function(index, layero){
					layer.close(index);
					//window.location.href='newStudentPlan.html'
					setTimeout(function(){
						sendDaySign();
					},1000)
				},
				btn2: function(index, layero){
					$('.to-clock').removeClass('clock').html('已打卡')
				}
			});
		}
	});
})
//生成日签
function sendDaySign() {
	var ua = navigator.userAgent;
	var isWeixin = !!/MicroMessenger/i.test(ua);
	$.ajax({
		url : ctx+"/api/lableController/lable",
		data : {
			segaId : courseId,
			day : day,
			projectId : studyPlanId
		},
		success : function (result) {
			console.log(result);
			if(result.code==0){
				$('.sign-contents').html('');
				$('.sign-contents').append('<div class="sign_img"><img src="'+result.data.url+'"/><img src="' + ctxSta + '/mobile/fdsm/img/daily_cancel.png" class="dailyCancel"/><a href="javascript:;" class="signShare"><p class="longSave">长按图片保存到相册</p><img src="' + ctxSta + '/mobile/fdsm/img/buttom_yellow.png"/></a><div>')
				$('.maskSign').show();
			}else{
				layer.msg("生成日签失败！", {icon: 7});
			}
		},
		error : function (result) {
			console.log("请求失败")
		}
	})
}
// 阻止滑动穿透事件
// $(".maskSign").on("touchmove",function(event){
//     event.preventDefault();
// });
// 点击x返回课程
$(document).on('click','.dailyCancel',function(){
	window.location.href = "/kdcccourse/f/main/studyCourse/getStudyCourserDetail?" +
		"&courseId="+courseId+"&studyPlanId="+studyPlanId+"&studyDay="+day;
})