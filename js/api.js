var link='http://l21.hisw.cn/fdvideoweb2.0/f';
//从连接提取参数
var userid='67e51f7e6aa9437882522d70c8146b37';
var courseId='2d525d5fb10a4b41baf1e0c088ad36f5';
function getUrlParam(name) {
//  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
//  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
//  if (r != null) return unescape(r[2]); return null; //返回参数值
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null;
}
//存cookie
function Setcookie (cname, cvalue, exdays){ 
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//取cookie
function getCookie(c_name){
//判断document.cookie对象里面是否存有cookie
if (document.cookie.length>0){
	c_start=document.cookie.indexOf(c_name + "=")
	//如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
	if (c_start!=-1){ 
	    c_start=c_start + c_name.length+1 
	    c_end=document.cookie.indexOf(";",c_start)
	    if (c_end==-1) c_end=document.cookie.length
		return unescape(document.cookie.substring(c_start,c_end))
		} 
	}
return ""
}
//删除cookie
function delCookie(name){
	Setcookie(name, "", -1);
}