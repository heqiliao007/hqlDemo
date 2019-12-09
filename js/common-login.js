var isLoginFalg = false;//是否登录标识
$(function(){
    var url = window.location.href;
    //跳往手机号登录
    if(url.indexOf("loginFlag") != -1){
        // $('.logorreg').hide();
        $('.mask').css("display","block");
        $('.mask-login').css("display","block");
    }
    //如果没有登录 打开登录窗口
    if(!isLoginFalg){
        if(url.indexOf("loginState") != -1){
            $('.mask').show();
            $(".mask-login").addClass("masks-key");
            $('.mask-login').show();
        }
    }
    //点击注册方式
    $('.aReg').click(function(){
        $('.mask-login').hide();
        $('.msk-reg').show();
    });
    // 点击登录
    $('.aLog').click(function(){
        $('.msk-reg').hide();
        $(".mask-login").removeClass("masks-key");
        $('.mask-login').show();
    });
    // 本机验证码登录
    $('.thisPhone').click(function(){
        $('.mask-login').hide();
        $('.mask-phone').addClass("masks-key");
        $('.mask-phone').show();
    });
    // 第二蒙层去登录
    $('.go-reg').click(function(){
        var title=$('.hint-title').text().substring(0,11);
        // console.log(title);
        $('.log-text').val(title);
        $('.msk-reg .mobile').val(title);
        $('.second-mask').hide();
        $('.msk-reg').show();
    })
    //手机验证码登录页面点击其他登录方式
    $('.log-other a').click(function(){
        $('.mask-login').show();
        $('.mask-phone').hide();
    });
    // 跳转点击gain
    $('.gain').click(function(){
        if($('.msk-reg .mobile').val().length>0){
            $(this).addClass('gain-ok');
        }
    })
    //点击忘记密码
    $('.log-forget').click(function(){
        $('.mask-login').hide()
        $('.mask-forget').show()
        $(".mask-forget").addClass("masks-key");
    })
    //关闭登录弹窗
    $('.mask-down').click(function(){
        $('.mask').hide()
        $('.mask>div').hide()
    })
    //关闭绑定弹窗
    $('.mask-down3').click(function(){
        $('.mask3').hide()
    })
    //绑定 1.号码输入只能是数字 2.验证码变色 3.出现X
    $('.msk-bind3 .mobile3').on('keyup',function(){
        this.value=this.value.replace(/[^\d]/g,'')
        yzmColor($(this).context,$('.msk-bind3 .gain3'));
        del($('#del3_1'),$(this));
    })
    //修改绑定颜色
    $('.case3 input').on('keyup',function(){
        if($(this).val().length!=0){
            var inputs=$(this).parent('.case3').siblings('.case3')
            for(var i=0;i<inputs.length;i++){
                if($(inputs[i]).children('input').val().length==0){
                    $(this).parent('.case3').siblings('.next3').removeClass('next-ok')
                    return false;
                }else if(i==inputs.length-1){
                    $(this).parent('.case3').siblings('.next3').addClass('next-ok')
                }
            }
        }else{
            $(this).parent('.case3').siblings('.next3').removeClass('next-ok')
        }
    })
    $('.msk-bind3 .code3').on('keyup',function(){
        del($('#del3_2'),$(this));
    })
    //绑定 点击X
    $('#del3_1').on('click',function(){
        $(this).parent().prev().prev().val("");
        $(this).css('display','none');
    })
    $('#del3_2').on('click',function(){
        $(this).parent().prev().val("");
        $(this).css('display','none');
    })
    //修改改变登录按钮颜色
    function changeColor(){
        if($('.log-pas').val().length!=0&&$('.log-text').val().length!=0){
            $('.log-btn').addClass('log-btn-ok')
        }else{
            $('.log-btn').removeClass('log-btn-ok')
        }
    }
    // 密码登录 1.输入不能为空 2.变色 3.出现x
    $('.log-text').on('keyup',function(){
        this.value=this.value.replace(/[^\d]/g,'')
        changeColor();
        del($($('.mask-login .del')[0]),$(this));
    })
    $('.log-pas').on('keyup',function(){
        this.value=this.value.replace(/^ +| +$/g,'');
        changeColor();
        del($($('.mask-login .del')[1]),$(this));
    });
    // 1.手机号不能为空为非数字 2.改变获取验证码颜色 3.出现x
    // mobile 注册0 忘记密码1 验证码登录2
    // 手机号码del0 密码del1
    $($('.mobile')[0]).on('keyup',function(){
        this.value=this.value.replace(/[^\d]/g,'');
        yzmColor($(this).context,$('.msk-reg .gain'));
        del($($('.msk-reg .del')[0]),$(this));
    });
    $($('.mobile')[1]).on('keyup',function(){
        this.value=this.value.replace(/[^\d]/g,'')
        yzmColor($(this).context,$('.mask-forget .gain'));
        del($($('.mask-forget .del')[0]),$(this));
    });
    $($('.mobile')[2]).on('keyup',function(){
        this.value=this.value.replace(/[^\d]/g,'')
        yzmColor($(this).context,$('.mask-phone .gain'));
        del($($('.mask-phone .del')[0]),$(this));
    });
    function yzmColor(dom,gain){
        //dom
        if(dom.value.length!=0){
            gain.addClass('gain-ok')
        }else{
            gain.removeClass('gain-ok')
        }
    }
    // 出现的X
    // 注册 手机号码del0 验证码del1 密码del2 确认密码del3
    // yzm 注册0 忘记密码1
    $($('.yzm')[0]).on('keyup',function(){
        del($($('.msk-reg .del')[1]),$(this));
    })
    // 注册密码password0 注册确认密码password1
    $($('.password')[0]).on('keyup',function(){
        del($($('.msk-reg .del')[2]),$(this));
    })
    $($('.password')[1]).on('keyup',function(){
        del($($('.msk-reg .del')[3]),$(this));
    })
    // 忘记密码
    $($('.yzm')[1]).on('keyup',function(){
        del($($('.mask-forget .del')[1]),$(this));
    })
    // 重置密码password2 找回密码password3
    $($('.password')[2]).on('keyup',function(){
        // console.log(22)
        del($($('.new-pass .del')[0]),$(this));
    })
    $($('.password')[3]).on('keyup',function(){
        del($($('.new-pass .del')[1]),$(this));
    })
    // 验证码登录
    $($('.yzm')[2]).on('keyup',function(){
        del($($('.mask-phone .del')[1]),$(this));
    })
    function del(dom,thisone){
        dom.css('display','inline-block');
        if(thisone.val() == ''){
            dom.css('display','none');
        }
    }
    //点击xx 清空 + 恢复变色
    // 密码登录
    $('#del-lg-ph').on('click',function(){
        empty($(this));
        changeColor();
    })
    $('#del-lg-pw').on('click',function(){
        empty($(this));
        changeColor();
    })
    // 注册
    $($('.msk-reg .del')[0]).on('click',function(){
        $(this).parent().prev().prev().val("");
        $(this).css('display','none');
        $('.msk-reg .warn').hide();
        $('.msk-reg .gain').removeClass('gain-ok');
        footColor($(this).parent().prev().prev());
    })
    $($('.msk-reg .del')[1]).on('click',function(){
        empty($(this));
        footColor($(this).parent().prev());
    })
    $($('.msk-reg .del')[2]).on('click',function(){
        empty($(this));
        footColor($(this).parent().prev());
    })
    $($('.msk-reg .del')[3]).on('click',function(){
        empty($(this));
        footColor($(this).parent().prev());
    })
    // 忘记密码
    $('#del-fg1').on('click',function(){
        $(this).parent().prev().prev().val("");
        $(this).css('display','none');
        $('.mask-forget .warn').hide();
        $('.mask-forget .gain').removeClass('gain-ok');
        footColor($(this).parent().prev().prev());
    })
    $($('.mask-forget .del')[1]).on('click',function(){
        empty($(this));
        footColor($(this).parent().prev());
    })
    // 找回密码
    $($('.new-pass .del')[0]).on('click',function(){
        empty($(this));
        $('.new-pass .warn').hide();
        footColor($(this).parent().prev());
    });
    $($('.new-pass .del')[1]).on('click',function(){
        empty($(this));
        footColor($(this).parent().prev());
    });
    // 验证码登录
    $('#del-fg2').on('click',function(){
        $(this).parent().prev().prev().val("");
        $(this).css('display','none');
        $('.mask-phone .warn').hide();
        $('.mask-phone .gain').removeClass('gain-ok');
        footColor($(this).parent().prev().prev());
    })
    $($('.mask-phone .del')[1]).on('click',function(){
        empty($(this));
        footColor($(this).parent().prev());
    })
    function empty(thisone){
        thisone.parent().prev().val("");
        thisone.css('display','none');
    }
    //改变底部按钮颜色
    $('.case input').on('keyup',function(){
        footColor($(this));
    })
    function footColor(dom){
        if(dom.val().length!=0){
            var inputs=dom.parent('.case').siblings('.case')
            for(var i=0;i<inputs.length;i++){
                if($(inputs[i]).children('input').val().length==0){
                    dom.parent('.case').siblings('.next').removeClass('next-ok')
                    return false;
                }else if(i==inputs.length-1){
                    dom.parent('.case').siblings('.next').addClass('next-ok')
                }
            }
        }else{
            dom.parent('.case').siblings('.next').removeClass('next-ok')
        }
    }
    //点击登录
    $(document).on('click','.log-btn-ok',function(){
        var myreg = /^((1[0-9]{1})+\d{9})$/;
        //验证是否是手机号
        if(!myreg.test($('.log-text').val())){
            $('.mask-login .warn').show()
            $('.mask-login .warn').html('<img src="' + ctxSta + '/mobile/fdsm/img/warnred.png">手机号格式错误')
            return false;
        }else{
            var user={'mobile':$('.log-text').val(),'password':$('.log-pas').val()}
            //验证是否注册
            $.ajax({
                type: 'POST',
                url: ctx + "/api/auth/checkMobileUnique",
                data: {'mobile':$('.log-text').val()},
                success : function(msg) {
                    console.log(msg)
                    if(msg.code==0){
                        $('.second-mask').show()
                        $('.hint-title').html($('.log-text').val()+'手机号未被注册')
                    }else{
                        //验证手机号密码
                        $.ajax({
                            type: 'POST',
                            url: ctx + "/api/auth/login",
                            data: user,
                            success : function(data) {
                                console.log(data)
                                if(data.code==0){
                                    // 跳转
                                    isLoginFalg = true;
                                    window.location.reload();
                                }else if(data.code==403){
                                    $('.mask-login .warn').show()
                                    $('.mask-login .warn').html('<img src="' + ctxSta + '/mobile/fdsm/img/warnred.png">手机号或密码错误')
                                }
                            }
                        });
                    }
                }
            });
        }
    })
    //获取用户信息(用于绑定)
    $.ajax({
        type: 'POST',
        url: ctx + "/api/auth/getInfo",
        success : function(msg) {
            console.log(msg)
            if(msg.code==0){
                //通过用户的mobile字段判断 该用户是否绑定过手机号
                var mobileNumber=msg.data.mobile;
                if(mobileNumber == ''){
                    $('.mask3').show();
                    $(".msk-bind3").show();
                }
                $('.mask').hide()
                $('.mask>div').hide()
                isLoginFalg = true;
            }
        }
    });
    //关闭提示
    $('.hint>img').click(function(){
        $('.second-mask').hide()
    })
    $('.cancel').click(function(){
        $('.second-mask').hide()
    })
    $('.second-mask-down').click(function(){
        $('.second-mask').hide()
    });
    //获取验证码
    getCode=function(warn,gain,mobile,type){
        $.ajax({
            type: 'POST',
            url: ctx+"/api/auth/ask4Validation",
            data: {'mobile':mobile,'type':type},
            success : function(data) {
                console.log(data)
                if(data.code==0){
                    var minute=60
                    gain.html('重新获取('+minute+')')
                    gain.removeClass('gain-ok')
                    var oneMinute=setInterval(function(){
                        minute--;
                        gain.html('重新获取('+minute+')')
                        if(minute==0){
                            clearInterval(oneMinute)
                            gain.html('再次获取')
                            if($('.mobile').val().length!=0){
                                gain.addClass('gain-ok')
                            }
                        }
                    },1000)
                }else{
                    warn.show()
                    warn.html('<img src="'+ctxSta+'/mobile/fdsm/img/warnred.png">'+data.msg)
                }
            }
        });
    }
    //验证是否是未注册过的手机----type1
    function validate(warn,gain,mobile){
        //验证是否是手机号
        var myreg = /^(1+\d{10})$/;
        console.log(mobile);
        if(!myreg.test(mobile)){
            warn.show()
            warn.html('<img src="'+ctxSta+'/mobile/fdsm/img/warnred.png">手机号格式错误')
            return false;
        }else{
            warn.hide();
            // 验证是否注册
            $.ajax({
                type: 'POST',
                url: ctx+"/api/auth/checkMobileUnique",
                data: {'mobile':mobile},
                success : function(msg) {
                    console.log(msg)
                    if(msg.code==403){
                        $('.second-mask').show()
                        $('.hint-title').html(mobile+'手机号已被注册')
                        $('.hint-con').html('请确认手机号是否输入有误，若您已经注册过手机账号，可以直接用该手机号登录')
                        $('.go-reg').html("直接登录");
                        $('.go-reg').on('click',function(){
                            $('.second-mask').hide();
                            $('.msk-reg').hide();
                            $('.mask-login').show();
                        })
                    }else{
                        getCode(warn,gain,mobile,'1');
                    }}
            });
        }
    }
    //注册点击获取验证码
    $(document).on('click','.msk-reg .gain-ok',function(){
        validate($('.msk-reg .warn'),$('.msk-reg .gain'),$('.msk-reg .mobile').val());
    })
    //点击注册
    $(document).on('click','.msk-reg .next-ok',function(){
        // 原来^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$
        //密码过于简单 6-16 字母含数字 区分大小写
        if((!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test($('.password')[0].value))){
            $('.msk-reg .warn').show();
            $('.msk-reg .warn').html('<img src="'+ctxSta+'/mobile/fdsm/img/warnred.png">密码过于简单，请重新设置');
        }else{
            checkPwd();
        }
    })
    //注册判断两次密码是否一致
    function checkPwd(){
        var passwd1= $($('.password')[0]).val();
        var passwd2= $($('.password')[1]).val();
        // console.log(passwd1,passwd2)
        if(passwd1!=passwd2){
            $('.msk-reg .warn').show();
            $('.msk-reg .warn').html('<img src="'+ctxSta+'/mobile/fdsm/img/warnred.png">两次密码不一致！');
        }else{
            // console.log('一致通过');
            $('.msk-reg .warn').hide();
            var user={'mobile':$($('.mobile')[0]).val(),'password':$($('.password')[0]).val(),'code':$($('.code')[0]).val()}
            $.ajax({
                type: 'POST',
                url: ctx+"/api/auth/register",
                data: user,
                success : function(data) {
                    console.log(data)
                    if(data.code==0){
                        layer.msg('注册成功',function(){
                            $('.msk-reg').hide();
                            $('.mask-login').show();
                            $(".log-pas").val("");
                            $('.log-text').val($($('.mobile')[0]).val());
                            $(".warn").css("display","none");
                        })
                    }else{
                        $('.msk-reg .warn').show()
                        $('.msk-reg .warn').html('<img src="'+ctxSta+'/mobile/fdsm/img/warnred.png">'+data.msg)
                    }
                }
            });
        }
    }
    // 验证是否是已注册过的手机号 ----type2
    function validate2(maskMobile,maskWarn,maskWhich,maskGain){
        //验证是否是手机号
        var myreg = /^(1+\d{10})$/;
        if(!myreg.test(maskMobile)){
            maskWarn.show()
            maskWarn.html('<img src="'+ctxSta+'/mobile/fdsm/img/warnred.png">手机号格式错误')
            return false;
        }else{
            maskWarn.hide();
            //验证是否注册
            $.ajax({
                type: 'POST',
                url: ctx+"/api/auth/checkMobileUnique",
                data: {'mobile':maskMobile},
                success : function(msg) {
                    console.log(msg)
                    if(msg.code==0){
                        $('.second-mask').show()
                        $('.hint-title').html(maskMobile+'手机号未注册')
                        $('.hint-con').html('请检查是否输入有误，或者使用该手机号注册一个新账号。')
                        $('.go-reg').html("直接注册");
                        $('.go-reg').on('click',function(){
                            $('.second-mask').hide();
                            maskWhich.hide();
                            $('.msk-reg').show();
                        });
                        //注册过了的
                    }else if(msg.code==403){
                        getCode(maskWarn,maskGain,maskMobile,'2');
                    }
                }
            });
        }
    }
    //找回密码 点击获取验证码
    $(document).on('click','.mask-forget .gain-ok',function(){
        validate2($('.mask-forget .mobile').val(),$('.mask-forget .warn'),$('.mask-forget'),$('.mask-forget .gain'));
    })
    //找回密码 下一步
    $(document).on('click','.mask-forget .next-ok',function(){
        var user={'mobile':$($('.mobile')[1]).val(),'code':$($('.code')[3]).val()}
        $.ajax({
            type: 'POST',
            url: ctx+"/api/auth/ask4resetAuth",
            data: user,
            success : function(data) {
                console.log(data)
                if(data.code==403){
                    $('.mask-forget .warn').show();
                    $('.mask-forget .warn').html('<img src="'+ctxSta+'/mobile/fdsm/img/warnred.png">验证码错误');
                }else if(data.code==0){
                    //layer.msg('请重置密码')
                    $('.mask-forget').hide();
                    $('.new-pass').show();
                    $(".new-pass").addClass("masks-key");
                    //重置密码
                    $(document).on('click','.new-pass .next-ok',function(){
                        //密码过于简单
                        if((!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test($('.password')[2].value))){
                            $('.new-pass .warn').show();
                            $('.new-pass .warn').html('<img src="'+ctxSta+'/mobile/fdsm/img/warnred.png">密码过于简单，请重新设置');
                        }else{
                            var passwd1= $($('.password')[2]).val();
                            var passwd2= $($('.password')[3]).val();
                            // console.log(passwd1,passwd2)
                            if(passwd1!=passwd2){
                                $('.new-pass .warn').show();
                                $('.new-pass .warn').html('<img src="'+ctxSta+'/mobile/fdsm/img/warnred.png">两次密码不一致！');
                            }else{
                                console.log('一致通过');
                                var user={'mobile':$($('.mobile')[1]).val(),'password':$($('.password')[2]).val(),'authCode':data.data}
                                $.ajax({
                                    type: 'POST',
                                    url: ctx+"/api/auth/resetPassword",
                                    data: user,
                                    success : function(data) {
                                        console.log(data)
                                        if(data.code==0){
                                            layer.msg('重置密码成功');
                                            $('.new-pass').hide();
                                            $('.mask-login').show();
                                            $(".log-pas").val("");
                                            $('.log-text').val($($('.mobile')[1]).val());
                                            $(".warn").css("display","none");
                                        }else{
                                            layer.msg(data.msg);
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    });
    /*-------------------------------------- 验证码登录  ---------------------------------*/
    // 1.获取验证码
    $(document).on('click','.mask-phone .gain-ok',function(){
        validate2($('.mask-phone .mobile').val(),$('.mask-phone .warn'),$('.mask-phone'),$('.mask-phone .gain'));
    })
    // 2.验证验证码---登录
    $(document).on('click','.mask-phone .next-ok',function(){
        var user={'mobile':$($('.mobile')[2]).val(),'code':$($('.mask-phone .code')).val()}
        $.ajax({
            type: 'POST',
            url: ctx+"/api/auth/mobileCodeLogin",
            data: user,
            success : function(data) {
                console.log(data)
                if(data.code==0){
                    layer.msg(data.msg);
                    $('.mask').hide()
                    $('.mask>div').hide()
                    isLoginFalg = true;
                    window.location.reload();
                }else{
                    $('.mask-phone .warn').show()
                    $('.mask-phone .warn').html('<img src="' + ctxSta + '/mobile/fdsm/img/warnred.png">'+data.msg)
                }
            }
        })
    })
    /*-------------------------------------- 绑定手机  -------------------------------*/
    //绑定手机号
    $(document).on('click','.msk-bind3 .gain-ok',function(){
        validate3($('.msk-bind3 .warn3'),$('.msk-bind3 .gain3'),$('.msk-bind3 .mobile3').val());
    })
    //绑定部分-验证手机号
    function validate3(warn,gain,mobile){
        //验证是否是手机号
        var myreg = /^(1+\d{10})$/;
        console.log(mobile,warn);
        if(!myreg.test(mobile)){
            warn.show();
            warn.html('<img src="'+ctxSta+'/mobile/fdsm/img/warnred.png">手机号格式错误');
            return false;
        }else{
            //验证是否注册
            $.ajax({
                type: 'POST',
                url: ctx+"/api/auth/checkMobileUnique",
                data: {'mobile':mobile},
                success : function(msg) {
                    console.log(msg)
                    if(msg.code==403){
                        warn.show();
                        warn.html('<img src="'+ctxSta+'/mobile/fdsm/img/warnred.png">该手机号已注册');
                    }else if(msg.code==0){
                        warn.hide();
                        types=1;
                        getCode(warn,gain,mobile,types);
                    }
                }
            });
        }
    };
    //点击绑定
    $(document).on('click','.msk-bind3 .next-ok',function() {
        var user = {'mobile': $('.mobile3').val(), 'code': $('.code3').val()}
        console.log(user);
        $.ajax({
            type: 'POST',
            url: ctx+"/api/auth/updateMobile",
            data: user,
            success : function(data) {
                if(data.code==0){
                    $('.msk-bind3').hide();
                    layer.msg('绑定成功',function(){
                        window.location.reload();
                    })
                }else{
                    $('.msk-bind3 .warn3').show();
                    $('.msk-bind3 .warn3').html('<img src="'+ctxSta+'/mobile/fdsm/img/warnred.png">'+data.msg);
                }
            }
        });
    });
})
