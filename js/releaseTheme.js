//上传文件
// $(document).on('change', '.text input', function () {
//     var formData = new FormData();
//
//     var fileType = $(this)[0].files[0].type;
//     if(/(video)|(mp4)|(MKV)|(AVI)/.test(fileType)){
//         /*视频类格式,禁止上传*/
//         layer.msg('暂不能上传视频');
//         return null;
//     }
//
//     formData.append('file', $(this)[0].files[0]);
//     if ($(this)[0].files[0] != undefined) {
//         var index = layer.load(0, {
//             shade: [0.1, '#000'] //0.1透明度的白色背景
//         });
//     }
//     var fileNmae = $(this)[0].files[0].name;
//     var fileSize = ($(this)[0].files[0].size / (1024 * 1024)).toFixed(2) + "MB";
//     var suffix = fileNmae.split('.').pop().toLowerCase();
//     console.log(suffix)
//     $.ajax({
//         type: "POST",
//         url: "/kdcccourse/f/api/upload/file",
//         data: formData,
//         processData: false,
//         contentType: false,
//         success: function (msg) {
//             console.log(msg)
//             if (msg.code == 0) {
//                 //图片
//                 if (suffix == 'jpg' || suffix == 'png' || suffix == 'gif' || suffix == 'jpeg') {
//                     $('.file-ok').append('<div class="file-img" accessoryid=' + msg.data[0].id + '>' +
//                         '<span><img src="' + msg.data[0].url + '"/><img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/></span>' +
//                         '<p class="file-name">' + fileNmae + '</p>' +
//                         '<p class="file-size">' + fileSize + '</p>' +
//                         '</div>')
//                     //视频
//                 } else if (suffix == 'mp4' || suffix == 'mov') {
//                     $('.file-ok').append('<div class="file-video" accessoryid=' + msg.data[0].id + '>' +
//                         '<span><video src="' + msg.data[0].url + '" poster="' + msg.data[0].videoImgUrl + '"></video>' +
//                         '<img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/><img src="/kdcccourse/static/mobile/fdsm/img/clickplay.png" class="file-play"></span>' +
//                         '<p class="file-name">' + fileNmae + '</p>' +
//                         '<p class="file-size">' + fileSize + '</p>' +
//                         '</div>')
//                     //音频
//                 } else if (suffix == 'mp3') {
//                     $('.file-ok').append('<div class="file-voice" accessoryid=' + msg.data[0].id + '>' +
//                         '<span><img src="' + ctxSta + '/mobile/fdsm/img/mp3.png"/><img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/></span>' +
//                         '<p class="file-name">' + fileNmae + '</p>' +
//                         '<p class="file-size">' + fileSize + '</p>' +
//                         '</div>')
//                     //pdf文件
//                 } else if (suffix == 'pdf') {
//                     $('.file-ok').append('<div class="file-doc" accessoryid=' + msg.data[0].id + '>' +
//                         '<span><img src="' + ctxSta + '/mobile/fdsm/img/pdf.png"/><img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/></span>' +
//                         '<p class="file-name">' + fileNmae + '</p>' +
//                         '<p class="file-size">' + fileSize + '</p>' +
//                         '</div>')
//                     //word文档
//                 } else if (suffix == 'doc' || suffix == 'xml' || suffix == 'docx' || suffix == 'dot') {
//                     $('.file-ok').append('<div class="file-doc" accessoryid=' + msg.data[0].id + '>' +
//                         '<span><img src="' + ctxSta + '/mobile/fdsm/img/word-big.png"/><img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/></span>' +
//                         '<p class="file-name">' + fileNmae + '</p>' +
//                         '<p class="file-size">' + fileSize + '</p>' +
//                         '</div>')
//                     //excel表格
//                 } else if (suffix == 'xlsx' || suffix == 'xls' || suffix == 'xltx') {
//                     $('.file-ok').append('<div class="file-doc" accessoryid=' + msg.data[0].id + '>' +
//                         '<span><img src="' + ctxSta + '/mobile/fdsm/img/excel.png"/><img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/></span>' +
//                         '<p class="file-name">' + fileNmae + '</p>' +
//                         '<p class="file-size">' + fileSize + '</p>' +
//                         '</div>')
//                     //其他文件
//                 } else {
//                     $('.file-ok').append('<div class="file-doc" accessoryid=' + msg.data[0].id + '>' +
//                         '<span><img src="' + ctxSta + '/mobile/fdsm/img/text.png"/><img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/></span>' +
//                         '<p class="file-name">' + fileNmae + '</p>' +
//                         '<p class="file-size">' + fileSize + '</p>' +
//                         '</div>')
//                 }
//                 layer.close(index);
//             } else {
//                 layer.msg('上传失败');
//                 layer.close(index);
//             }
//         }, error: function () {
//             layer.msg('上传失败');
//             layer.close(index);
//         }
//     });
//     // $("#fileForm").submit().resetForm();
// });


function fileUpload() {
    var formData = new FormData()

    var fileType = $(this)[0].files[0].type
    // console.log($(this)[0].files[0],'type')
    if (/(video)|(mp4)|(MKV)|(AVI)/.test(fileType)) {
        /*视频类格式,禁止上传*/
        // layer.msg('暂不能上传视频');
        layer.open({
            area: ['70%'],
            title: '提示信息'
            , content: '暂不能上传视频'
        })
        return null
    }

    formData.append('file', $(this)[0].files[0])
    if ($(this)[0].files[0] != undefined) {
        var index
        $.get(ctxSta + '/mobile/fdsm/plugin/alertUpload.html', function (data) {
            /*上传弹出窗口样式*/
            index = layer.open({
                type: 4,
                area: ['100%', '100%'],
                content: data,
            })
        })
    }

    var fileNmae = $(this)[0].files[0].name
    var fileSize = ($(this)[0].files[0].size / (1024 * 1024)).toFixed(2) + "MB"
    var suffix = fileNmae.split('.').pop().toLowerCase()

    var postConfig =     {
        type: "POST",
        url: "/kdcccourse/f/api/upload/file",
        data: formData,
        processData: false,
        contentType: false,
        success: function (msg) {
            submitOk() //激活发布按钮:
            console.log(msg)
            if (msg.code == 0) {
                //图片
                if (suffix == 'jpg' || suffix == 'png' || suffix == 'gif' || suffix == 'jpeg') {
                    $('.file-ok').append('<div class="file-img" accessoryid=' + msg.data[0].id + '>' +
                        '<span><img src="' + msg.data[0].url + '"/><img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/></span>' +
                        '<p class="file-name">' + fileNmae + '</p>' +
                        '<p class="file-size">' + fileSize + '</p>' +
                        '</div>')
                    //视频
                } else if (suffix == 'mp4' || suffix == 'mov') {
                    $('.file-ok').append('<div class="file-video" accessoryid=' + msg.data[0].id + '>' +
                        '<span><video src="' + msg.data[0].url + '" poster="' + msg.data[0].videoImgUrl + '"></video>' +
                        '<img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/><img src="/kdcccourse/static/mobile/fdsm/img/clickplay.png" class="file-play"></span>' +
                        '<p class="file-name">' + fileNmae + '</p>' +
                        '<p class="file-size">' + fileSize + '</p>' +
                        '</div>')
                    //音频
                } else if (suffix == 'mp3') {
                    $('.file-ok').append('<div class="file-voice" accessoryid=' + msg.data[0].id + '>' +
                        '<span><img src="' + ctxSta + '/mobile/fdsm/img/mp3.png"/><img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/></span>' +
                        '<p class="file-name">' + fileNmae + '</p>' +
                        '<p class="file-size">' + fileSize + '</p>' +
                        '</div>')
                    //pdf文件
                } else if (suffix == 'pdf') {
                    $('.file-ok').append('<div class="file-doc" accessoryid=' + msg.data[0].id + '>' +
                        '<span><img src="' + ctxSta + '/mobile/fdsm/img/pdf.png"/><img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/></span>' +
                        '<p class="file-name">' + fileNmae + '</p>' +
                        '<p class="file-size">' + fileSize + '</p>' +
                        '</div>')
                    //word文档
                } else if (suffix == 'doc' || suffix == 'xml' || suffix == 'docx' || suffix == 'dot') {
                    $('.file-ok').append('<div class="file-doc" accessoryid=' + msg.data[0].id + '>' +
                        '<span><img src="' + ctxSta + '/mobile/fdsm/img/word-big.png"/><img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/></span>' +
                        '<p class="file-name">' + fileNmae + '</p>' +
                        '<p class="file-size">' + fileSize + '</p>' +
                        '</div>')
                    //excel表格
                } else if (suffix == 'xlsx' || suffix == 'xls' || suffix == 'xltx') {
                    $('.file-ok').append('<div class="file-doc" accessoryid=' + msg.data[0].id + '>' +
                        '<span><img src="' + ctxSta + '/mobile/fdsm/img/excel.png"/><img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/></span>' +
                        '<p class="file-name">' + fileNmae + '</p>' +
                        '<p class="file-size">' + fileSize + '</p>' +
                        '</div>')
                    //其他文件
                } else {
                    $('.file-ok').append('<div class="file-doc" accessoryid=' + msg.data[0].id + '>' +
                        '<span><img src="' + ctxSta + '/mobile/fdsm/img/text.png"/><img src="' + ctxSta + '/mobile/fdsm/img/down-file.png" class="file-delect"/></span>' +
                        '<p class="file-name">' + fileNmae + '</p>' +
                        '<p class="file-size">' + fileSize + '</p>' +
                        '</div>')
                }
                layer.close(index)
            } else {
                // layer.msg('上传失败');
                layer.open({
                    area: ['70%'],
                    title: '提示信息'
                    , content: '上传失败'
                })

            }

            setTimeout(function () {
                layer.close(index)
            }, 500)
        }, error: function () {
            // layer.msg('上传失败');
            layer.open({
                area: ['70%'],
                title: '提示信息'
                , content: '上传失败'
            })
            setTimeout(function () {
                layer.close(index)
            }, 500)
        }
    }

    if(/^image/.test(fileType)){
        /*图片上传执行这个*/
        iosImg.start($(this)[0].files[0], postConfig).then((img) => {
            console.log("图片上传成功")
        })
    }else{
        /*非图片上传执行这个*/
        $.ajax(postConfig)
    }
}


$('.file1').change(fileUpload)
$('.file2').change(fileUpload)
$('.file3').change(fileUpload)


$(document).on('click', '.voice', function () {
    /*绑定音频上传上传*/
    $(".file1").click()
})


$(document).on('click', '.img', function () {
    /*绑定图片上传*/
    $(".file2").click()
})

$(document).on('click', '.doc', function () {
    /*绑定文档上传*/
    $(".file3").click()
})


//删除上传的文件
$(document).on('click', '.file-delect', function () {
    $(this).parent().parent().remove()
})


function submitOk() {
    /*激活发布按钮*/
    $('.submit').addClass('submit-ok')
}

//多行文本框输入
$(document).on('keyup', '.text textarea', function () {
    this.value = this.value.replace(/^ +| +$/g, '')
    $(this).siblings('.icons').children('.words').html($(this).val().length + '/200')
    for (var l = 0; l < $('.text').length; l++) {
        if ($($('.text')[l]).children('textarea').val().length == 0) {
            $('.submit').removeClass('submit-ok')
            break
        } else if (l == $('.text').length - 1) {
            submitOk()
        }
    }
})

//发布
function submicallback() {
    var submitClick = false
    console.log(submitClick, 's')
    $(document.body).on('click', '.submit-ok', function () {
        console.log(submitClick, 'sub')
        if (submitClick) {
            return null  //阻止重复点击
        }

        var index
        $.get(ctxSta + '/mobile/fdsm/plugin/alertUpload.html', function (data) {
            /*上传弹出窗口样式*/
            index = layer.open({
                type: 4,
                area: ['100%', '100%'],
                content: data,
            })
        })

        var datas = {'programId': programId, 'userId': userid, 'content': $('.text textarea').val()}
        var dataLibraryIds = ''
        for (var j = 0; j < $('.file-ok').children('div').length; j++) {
            dataLibraryIds += $($('.file-ok').children('div').get(j)).attr('accessoryid') + ','
        }
        datas.dataLibraryId = dataLibraryIds
        submitClick = true
        $.ajax({
            type: "POST",
            url: ctx + "/api/programApiController/saveTopicInfo",
            data: datas,
            success: function (msg) {
                if (msg.code === 0) {
                    layer.msg('发布成功', {anim: 0}, function () {
                        window.location.href = ctx + "/courseDetails?programId=" + programId + "&topicSign"
                        // if(window.location.href.indexOf("topicSign") != -1){
                        // window.location.href = ctx+"/course?topicSign";
                        // window.history.back();
                    })
                } else {
                    layer.msg(msg.msg)
                }
            },
            complete: function () {
                submitClick = false
                setTimeout(function () {
                    layer.close(index)
                }, 300)
            }
        })
    })
}

submicallback()



setTimeout(function () {
    /*请求图片上传旋转处理插件*/
    $(document.body).append($("<script type=\"text/javascript\" defer=\"defer\" src=\"" + ctxSta + "/mobile/fdsm/plugin/iosUploadImg-RepairRevolve.js\"> </script>"))
}, 1000)



