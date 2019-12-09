/* 
	公用模块 
	hhwen
	
	该模块封装一些 公众号里 常用到的方法
	比如获取openid
	发起ajax请求
 */

//定义一些key，方便以后修改
//关闭/开启日志打印
const COMMON_KEY_LOG = true
//api url 前缀
const COMMON_API_PREFIX = ajaxs
//该字符串用于查找链接上的openid
const COMMON_KEY_OPENID_STR = 'openid'
//该字符串用于定义默认的openid
const COMMON_KEY_OPENID_DEFAULT = 'o8D5D1qJj1za1poCjjwlDGt0r5YA'
//变量用于限制整个项目的图片上传数目
const COMMON_KEY_IMAGES_COUNT = 5
//用于判断是否是测试环境
const COMMON_KEY_IS_TEST_STR = 'testapi'
//标识环境 true:测试环境 | false:其他环境
const COMMON_KEY_IS_TEST_ENV = COMMON_API_PREFIX.indexOf(COMMON_KEY_IS_TEST_STR) >= 0
//正式环境获取openid 失败提示
const COMMON_KEY_TIP_NO_OPENID = '服务错误，请退出重试！ERRORCODE = 10099'
//渠道字符串
const COMMON_CHANNEL = 'wechat'

//上传图片接口
const COMMON_API_IMG_UPLOAD_URL = ajaxs + "FileService/UploadV2";

//初始化
var common_openid = COMMON_KEY_OPENID_DEFAULT
$(function() {
	//如果是测试环境 打开虚拟控制台 方便查看日志
	if (COMMON_KEY_IS_TEST_ENV) {
		//HTML 需要引入vConsole.js
//		common_testJs("js/vconsole.min.js", function() {
//			common_log('检测到测试环境 加载vconsole.js DONE');
//			var vConsole = new VConsole();
//		});
	}
	//引入mui
	common_testJs("js/mui.min.js", function() {
		common_log('加载mui.js done');

	});


})
//通过code-获取openid 考虑到了各种情况，最后获取不到的话会使用默认openid 并输出提示
function common_fn_getOpenid(callback) {
	//如果url上有openid，就直接从url上拿
	if (common_fn_getCode(COMMON_KEY_OPENID_STR) != null) {
		common_openid = common_fn_getCode(COMMON_KEY_OPENID_STR)
		if (callback != null) {
			callback()
		}
		return
	}
	//如果url上没有openid 那获取code 然后去后台请求得到openid
	let url = ajaxs + "GetOpenid/" + common_fn_getCode("code") + "/" + window.location.pathname.split("/").pop()
	common_request_GET(url, {}, function(data) {
		if (data.data.length > 0) {
			//获取成功
			common_openid = data.data[0].openid;
			common_log(` 测试，成功获取到openid : ${common_openid} `)
		} else {
			//获取失败 可能是获取不到code 可能是其他原因
			common_log(JSON.stringify(data), 1)
			if (COMMON_KEY_IS_TEST_ENV) { //测试环境 
				common_log(` 测试环境，使用默认测试openid : ${common_openid}`)
			} else { //正式环境 出错的情况 不执行后续逻辑
				common_log(` 正式环境，无法获取到openid `)
				common_alert(COMMON_KEY_TIP_NO_OPENID)
				return
			}
		}

		//重定向 在链接上加上openid 
		let url = window.location.href
		if (url.indexOf('?') > 0) {
			url = `${url}&${COMMON_KEY_OPENID_STR}=${common_openid}&t=${Math.random()}`
		} else {
			url = `${url}?${COMMON_KEY_OPENID_STR}=${common_openid}&t=${Math.random()}`
		}
		window.location.replace(url)
	})
}
//总url获取参数的方法
function common_fn_getCode(name) {
	let search = decodeURI(window.location.search)
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	common_log('未找到 tsuccess 参数')
	return null;
}

//promise ajax
const common_request_GET_promise = (url, data = {}, timeout = 20) => {
	url = common_fn_asssembly(url, data)
	common_log(` START GET ${url}`)
	return new Promise((resolve, reject) => {
		$.ajax({
				url: url,
				type: "GET",
				timeout: timeout * 1000,
			})
			.then(data => {
				resolve(data)
			}, e => {
				common_log(url, 1);
				reject(e.s)
			})
	})
}

//ajax请求
/**
 * url 链接
 * data 数据
 * success_callback 成功回调
 * error_callback 错误回调
 * timeout 超时时间 默认20秒
 * contentType 默认"application/json"
 **/
function common_request_GET(url = '', data = {}, success_callback, error_callback, timeout = 20, contentType =
	"application/json") {
	url = common_fn_asssembly(url, data)
	common_log(` START GET ${url}`)
	$.ajax({
		url: url,
		type: "GET",
		timeout: 20 * 1000,
		// contentType:contentType,
		success: function(data) {
			if (success_callback != null) {
				success_callback(data)
			}
		},
		error: function() {
			common_log(url, 1)
			if (error_callback != null) {
				error_callback(url)
			}
		},
	})
}
/**
 * url 链接
 * data 数据
 * success_callback 成功回调
 * error_callback 错误回调
 * timeout 超时时间 默认20秒
 * contentType 默认"application/json"
 **/
function common_request_POST(url = '', data = {}, success_callback, error_callback, timeout = 20, contentType =
	"application/json; charset=UTF-8") {
	common_log(` START POST ${url}`)
	$.ajax({
		url: url,
		type: "POST",
		data: JSON.stringify(data),
		timeout: 20 * 1000,
		dataType: "json",
		contentType: contentType,
		success: function(data) {
			if (success_callback != null) {
				success_callback(data)
			}
		},
		error: function() {
			common_log(url, 1)
			if (error_callback != null) {
				error_callback(url)
			}
		},
	})
}
//打印模块
function common_log(text, errortype = 0) {
	if (!COMMON_KEY_LOG) {
		return
	}
	switch (errortype) {
		case 0:
			console.log(`${new Date()} COMMON INFO	: ${text}`)
			break;
		case 1:
			console.log(`${new Date()} COMMON ERROR	: ${text}`)
			break;
		case 2:
			console.log(`${new Date()} COMMON DEBUG	: ${text}`)
			break;
	}
}
//弹窗模块 需要引入mui js
function common_tost(text, duration = '2000') {
	if (typeof(mui) == undefined) {
		return
	}
	mui.toast(text, {
		duration: duration,
		type: 'div'
	})
}
//弹窗模块 需要引入mui js
function common_alert(message,title = "提示",btnValue="确定") {
	if (typeof(mui) == undefined) {
		return
	}
	mui.alert(message,title,btnValue,null,'div'
	)
}

//上传图片接口
function common_file_upload(file,type='1',success_callback,fail_callback) {
	if (file == null || file == undefined) {
		common_log('上传图片，文件不能为空！')
		return
	}  
	//上传第一张图
	var formdata1 = new FormData()
	formdata1.append("fileName", file)
	formdata1.append("type", "1")
	$.ajax({
		url: COMMON_API_IMG_UPLOAD_URL, //请求路径  
		type: 'POST',
		cache: false,
		data: formdata1,
		processData: false,
		contentType: false,
	}).then((data) => {
		if (success_callback != null && success_callback != undefined) {
			success_callback(data)
		}  
	}, (e) => {
		common_log("common  上传图片失败")
		if (fail_callback != null && fail_callback != undefined) {
			fail_callback(e)
		}  
	})
}

//给url加上随机数
const common_url_random = (url,str='&')=>{
	if (url == null || url == undefined) {
		return str+"t="+Math.random()
	} 
	if (url.indexOf("?") > 0) {
		return `url&t=${Math.random()}`
	} else{
		return `url?t=${Math.random()}`
	}
	 
}
//输入框自适应
function common_textarea_fit() {
	//return document.getElementsByClassName(c);
	var obj = document.getElementsByClassName("textarea");
	var len = obj.length;

	for (var i = 0; i < len; i++) {
		obj[i].onkeyup = function() {
			this.style.height = 'auto';
			this.style.height = this.scrollHeight + "px";
		};
	}
}
//日期格式化
Date.prototype.Format = function(fmt) { //author: meizz   
	var o = {
		"M+": this.getMonth() + 1, //月份   
		"d+": this.getDate(), //日   
		"h+": this.getHours(), //小时   
		"m+": this.getMinutes(), //分   
		"s+": this.getSeconds(), //秒   
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
		"S": this.getMilliseconds() //毫秒   
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}



//=================表单检测 for Input=============
//当前页面的表单元素集合
var common_check_list = {}
/*
参数说明  
obj_id：input对象 id
invalid_text：非法输入提示,不传的话直接为’‘
reg：正则表达式，不传只校验非空
callback：回调（带是否合法标识)
focus_fill_blank：是否聚焦清除内容，默认清除

FOR EXAMPLE ：
	//手机号检测
	common_fn_check('tel','',/1[0-9]{10}/g)
	//客户名
	common_fn_check('user-name','请输入企业名称')
	//用水地址
	common_fn_check('address')
*/
function common_fn_check(obj_id, invalid_text = '', reg, callback, focus_fill_blank = true) {
	//注册到表单集合
	//谁在common_fn_check_append里写的invalid_text = '' 让我找了半天
	common_fn_check_append(obj_id, invalid_text, reg, callback, focus_fill_blank = true)
	//获得焦点 绑定
	$(`#${obj_id}`).focus(function() {
		
		//从表单集合中取出对象 因为是异步的function 不能直接访问变量
		var reg_obj = common_check_list[$(this).attr('id')]
		// common_log(`${$(this).attr('id')} focus VAL: ${$(reg_obj['obj']).val()} ,REG: ${reg_obj['reg']} VALID: ${common_fn_check_isvalid($(reg_obj['obj']).val(),reg_obj['reg'])}`)
		//TODO 给加上默认焦点样式 去除错误样式
		$(reg_obj['obj']).removeClass('wrong')
		$($(reg_obj['obj']).parent().parent()).removeClass('wrong_line')
		//$(reg_obj['obj']).val('')
		//如果设置聚焦清除内容 并且 （内容不合法 或者 内容等于非法提示字符串） 就清除
		if (reg_obj['focus_fill_blank'] && (!common_fn_check_isvalid($(reg_obj['obj']).val(), reg_obj['reg']) || $(reg_obj[
				'obj']).val() == reg_obj['invalid_text'])) {
			$(reg_obj['obj']).val('')
		}
	});
	//失去焦点 绑定
	$(`#${obj_id}`).blur(function() {
		console.log(invalid_text)
		//从表单集合中取出对象 因为是异步的function 不能直接访问变量
		var reg_obj = common_check_list[$(this).attr('id')]
		// common_log(`${$(this).attr('id')} blur VAL: ${$(reg_obj['obj']).val()} ,REG: ${reg_obj['reg']} VALID: ${common_fn_check_isvalid($(reg_obj['obj']).val(),reg_obj['reg'])}`)
		//TODO 去除焦点样式

		//输入是否合法标识
		var isValid = common_fn_check_isvalid($(reg_obj['obj']).val(), reg_obj['reg'])
		//如果输入不合法就去掉内容
		if (!isValid) {
			//TODO 加上默认错误样式
			$(reg_obj['obj']).addClass('wrong')
			$($(reg_obj['obj']).parent().parent()).addClass('wrong_line')
			//显示错误信息 
			$(reg_obj['obj']).val(invalid_text)
		}
		//把是否合法传回页面
		if (reg_obj['callback'] != undefined) {
			reg_obj['callback'](isValid)
		}
	});
}

//验证表单集合里的所有表单 返回所有不合法的表单列表 并显示错误信息和设置错误样式
function common_fn_check_all() {
	//输入是否合法标识 默认合法
	var invalid_check = []

	Object.keys(common_check_list).forEach(function(key) {
		let obj = common_check_list[key].obj
		console.log(key, common_check_list[key]);

		// let obj = common_check_list[key]['obj']
		let reg = common_check_list[key]['reg']
		let invalid_text = common_check_list[key]['invalid_text']
		var isValid = common_fn_check_isvalid($(obj).val(), reg) && $(obj).val() != invalid_text

		if (!isValid) {
			//TODO 加上默认错误样式
			$(obj).addClass('wrong')
			//显示错误信息 
			$(obj).val(invalid_text)
			invalid_check.push(common_check_list[key])
		}
	});
	return invalid_check
}

function common_fn_check_isvalid(text, reg) {
	// common_log(`text : ${text} . reg : ${reg}`)

	if (reg != undefined) {
		return reg.test(text)
	} else {
		return text.replace(/\s+/g, "") != ''
	}
}

function common_fn_check_append(obj_id, invalid_text = '', reg, callback, focus_fill_blank = true) {

	common_check_list[obj_id] = {
		'obj': `#${obj_id}`,
		'reg': reg,
		'invalid_text': invalid_text,
		'callback': callback,
		'focus_fill_blank': focus_fill_blank
	}
}


//================utils============================================
//拼装URL 
const common_fn_asssembly = (url, data) => {
	url = `${url}?`
	$.each(data, (key, value) => {
		url = `${url}${key}=${value}&`
	})
	return url
}
//检测页面是否引入指定js  没有引入就自动引入
const common_testJs = (js_url, callback) => {
	if ($(`script[src='${js_url}']`).length > 0) {
		if (callback != null) {
			callback()
		}
		return;
	} else {
		common_loadJs(js_url, callback)
	}
}
//引入js方法
const common_loadJs = (js_url, callback) => {
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = js_url;
	document.body.appendChild(script);
	if (typeof(callback) != "undefined") {
		if (script.readyState) {
			script.onreadystatechange = () => {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			}
		} else {
			script.onload = () => {
				callback();
			}
		}
	}
}

//安卓默认字体问题
(function() {
	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
		handleFontSize();
	} else {
		if (document.addEventListener) {
			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
		} else if (document.attachEvent) {
			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
		}
	}

	function handleFontSize() {
		// 设置网页字体为默认大小
		WeixinJSBridge.invoke('setFontSizeCallback', {
			'fontSize': 0
		});
		// 重写设置网页字体大小的事件
		WeixinJSBridge.on('menu:setfont', function() {
			WeixinJSBridge.invoke('setFontSizeCallback', {
				'fontSize': 0
			});
		});
	}
})();
