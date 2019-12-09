$(function(){
	var customerCode = '';
	var customercodelist = [];
	//日期
	var billDate = '';
	var userID = '';//userID
	//应付总金额
	var needPay = '';
	//获取openid
	common_fn_getOpenid(function(){
		console.log(common_openid)
		//判定用户是否为第一次交费  
		//common_openid
		common_request_GET(ajaxs + "Customer/BindedAccountListByOpenid/wechat/" + common_openid,{},function(data){
			console.log(data)
			if(data.datarows == 1){
				//单编号
				customerCode = data.data[0].customerCode;
				customercodelist.push(customerCode)
			} else if(data.datarows > 1){
				//多编号
				$('#waterFee').html('水费合计')
//				customerCode = data.data[0].customerCode;
				customerCode = '1387013244' 
				customercodelist.push(customerCode)
				BillDetail()
			}
		})
		//调接口36获取contactId（账号id）
		common_request_GET(ajaxs+"GetUserInfo", {
	        channelcode:"wechat",
	        usercode:common_openid
	    }, (res) => {
	        common_log('获取用户信息 : ' + JSON.stringify(res))
	        if (res.datarows ===0) {
	            common_log("服务器错误")
	        } else {
	        	userID = res.data[0].userID;
	//      	console.log(userID,res.data[0].userID);
	        }
	    })
	})
	//按编号查询最近一期的账单明细
	function BillDetail(){
//		console.log({
//			"channel":"wechat",
//			"openid":common_openid,
//			"customercodelist":customercodelist
//		})
		common_request_POST(ajaxs + "BillInfo/GetLatestBillDetails/",{
			"channel":"wechat",
			"openid":common_openid,
			"customercodelist":customercodelist
		}, (res) => {
			console.log(res)
			if(res.datarows > 0){
				var data = res.data[0];
				billDate = data.costDate;
				console.log(billDate)
				needPay = data.needpay;
				$('.needpay').html(needPay)
				//水费合计
				$('#totalAmount span').html(data.totalAmount);
				$('#waterAmount span').html(data.waterAmount);
				$('#sewageCharges span').html(data.sewageAmount);
				$('#garbageAmount span').html(data.garbageAmount);
				//历史欠费
				$('#debtAmount span').html(data.deductedAmount);
			}else{
				$('.details').hide();
				$('.all-money').html('暂无未交清账单');
				$('.all-money').css({'font-size':'16px','color':'#999','padding':'3.07rem 0'})
			}
		})
	}
	//查看详情
	$('.watchDet').click(function(){
		window.location.href = 'Demo_price1.html'+'?date='+window.btoa(billDate)+'&customerCode='+window.btoa(customerCode)+common_url_random();
	})
	//去交费
	$('.toChange').click(function(){
		fnGetWXPayInfo()
	})
	//支付接口
	function fnGetWXPayInfo(){
		//address,paydate,userID,zo_money
		var url_prefix = "http://szgk.sz-water.com.cn/payservice/";
		var paydateStr = String(billDate).slice(0,4)+'年'+String(billDate).slice(4)+'月';
		//测试amount暂为1分 测试通过后取amount_money
		var amount_money = needPay*100;
		var payData = {
			"channelId":"3",//3:微信公众号
			"contactId":userID,
			"accountId":"olfjEjupsHr-OsExEk-hiJIV-m9c",
			"payType":"WxPay",
			"amount":1,
			"orderTitle":paydateStr+"水费",
			"details":[
				{
					"customerId":customerCode,
					"costMonth":billDate,
					"amount":1
				}
			]
		};
		console.log(payData,amount_money)
		var url = url_prefix + "pay/wxPayInfo";
		$.ajax({
	        url: url,
	        type: 'POST',
	        timeout:180000,
	        data: JSON.stringify(payData),
	        cache: false,
	        dataType: 'json',
	        contentType: 'application/json;charset=UTF-8',
	        processData: false,
	        success: function (response) {
	        	if(response!=null){
	        		if(response.succeed==true){
	        			//var token = response.content;
	            		//var paymentSN = token.paymentSN;
	            		//$('#txt_content_wx').html(JSON.stringify(response));
	            		var payInfo = response.content.payInfo;
	            		var paymentSn = response.content.paymentSn;
	            		payInfo = eval('(' + payInfo + ')');
	        			WeixinJSBridge.invoke('getBrandWCPayRequest',{
	        				"appId" : payInfo.appId,
	        				"timeStamp": payInfo.timeStamp,
	        				"nonceStr" : payInfo.nonceStr,
	        				"package" : payInfo.package,
	        				"signType" : payInfo.signType,
	        				"paySign" : payInfo.paySign
	    				},function(res){
	        				if(res.err_msg == "get_brand_wcpay_request:ok" ) {
	        					//	使用以上方式判断前端返回,微信团队郑重提示：res.err_msg 将在用户支付成功后返回ok，但并不保证它绝对可靠。
	        					localStorage.setItem('paymentSn', paymentSn);
	        					console.log("交费成功！");
								window.location.href = 'check-pay-ing.html?billmonth='+window.btoa(paydate)+'&customerCode='+window.btoa(address);
	        				}
	        			});
	        		}
	            	else{
	            		alert("错误");
	            		//$('#txt_content_wx').html(JSON.stringify(response.message));
	            	}
	        	}
	        },
			error:function(){
				console.log("error");
			}
		});
	};
	//查看历史账单
	$(".view-record").click(function () {
        window.location.href = 'check-pay-single-history.html?openid=' + window.btoa(common_openid) + '&customerCode=' + window.btoa(customerCode) +common_url_random();
    })
})
