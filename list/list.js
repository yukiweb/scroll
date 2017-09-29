var div_list_bg = document.createElement("div");
div_list_bg.setAttribute("class","list_bg");
var div_list_content = document.createElement("div");
div_list_content.setAttribute("class","list_content");
var div_list_data = document.createElement('div');
div_list_data.setAttribute("class","list_data")
div_list_bg.appendChild(div_list_content);
div_list_bg.appendChild(div_list_data);
var body = document.getElementsByTagName("body")[0];
body.appendChild(div_list_bg);
// 信息
var div_info_row = document.createElement("div");
div_info_row.setAttribute("class","info_row");
div_list_content.appendChild(div_info_row);
var tableInfo = document.createElement("table");
tableInfo.setAttribute("border",0);
tableInfo.setAttribute("cellspacing",0);
tableInfo.setAttribute("cellpadding",0);
div_info_row.appendChild(tableInfo)
var trInfo = document.createElement("tr");
tableInfo.appendChild(trInfo);
//样式初始化方法
function xxx_styleInit(data) {
    if(data.list[0].position){
        setCss($(".list_bg"),data.list[0].position);
    }
    if (data.list[0].bg) {
        setCss($(".list_bg"), data.list[0].bg);
    }
    if (data.list[0].frame) {
        if(data.list[0].frame.is_frame){
            setCss($(".list_bg"), data.list[0].frame);
        }
    }
    if(data.list[0].bar_bg){
        //先判断是否需要添加背景色
        if(data.list[0].bar_bg.is_bar_bg){
            $(".list_data").on("DOMNodeInserted",".follow_row",function () {
                setCss($(".follow_row"),data.list[0].bar_bg);
            })
            $(".list_data").on("DOMNodeInserted",".danmu_row",function () {
                setCss($(".danmu_row"),data.list[0].bar_bg);
            })
            $(".list_data").on("DOMNodeInserted",".info_row",function () {
                setCss($(".info_row"),data.list[0].bar_bg);
            })
            $(".list_data").on("DOMNodeInserted",".notice_row",function () {
                setCss($(".notice_row"),data.list[0].bar_bg);
            })
            $(".list_data").on("DOMNodeInserted",".join_row",function () {
                setCss($(".join_row"),data.list[0].bar_bg);
            })
            $(".list_data").on("DOMNodeInserted",".gift_row",function () {
                setCss($(".gift_row"),data.list[0].bar_bg);
            })
        }
    }
    if(data.list[0].bar_frame){
        if(data.list[0].bar_frame.is_bar_frame){
            $(".list_data").on("DOMNodeInserted",".follow_row",function () {
                setCss($(".follow_row"),data.list[0].bar_frame);
            })
            $(".list_data").on("DOMNodeInserted",".danmu_row",function () {
                setCss($(".danmu_row"),data.list[0].bar_frame);
            })
            $(".list_data").on("DOMNodeInserted",".info_row",function () {
                setCss($(".info_row"),data.list[0].bar_frame);
            })
            $(".list_data").on("DOMNodeInserted",".notice_row",function () {
                setCss($(".notice_row"),data.list[0].bar_frame);
            })
            $(".list_data").on("DOMNodeInserted",".join_row",function () {
                setCss($(".join_row"),data.list[0].bar_frame);
            })
            $(".list_data").on("DOMNodeInserted",".gift_row",function () {
                setCss($(".gift_row"),data.list[0].bar_frame);
            })
        }
        if(!data.list[0].bar_frame.is_bar_round){
            $(".list_data").on("DOMNodeInserted",".follow_row",function () {
                $(".follow_row").css("border-radius","unset")
            })
            $(".list_data").on("DOMNodeInserted",".danmu_row",function () {
                $(".danmu_row").css("border-radius","unset")
            })
            $(".list_data").on("DOMNodeInserted",".info_row",function () {
                $(".info_row").css("border-radius","unset")
            })
            $(".list_data").on("DOMNodeInserted",".notice_row",function () {
                $(".notice_row").css("border-radius","unset")
            })
            $(".list_data").on("DOMNodeInserted",".join_row",function () {
                $(".join_row").css("border-radius","unset")
            })
            $(".list_data").on("DOMNodeInserted",".gift_row",function () {
                $(".gift_row").css("border-radius","unset")
            })
        }
    }
    //房间信息样式设置
    //弹幕内容样式设置
    // 1.观众弹幕
        if(data.list[0].dm_fans){
            if(data.list[0].dm_fans.show_fans){
                setCss($(""))
            }
        }
    // 2.主播弹幕
    // 3.超管弹幕
    // 4.房管弹幕
    //礼物样式设置
    //进入房间样式设置
    //关注样式设置
    //通知样式设置
    //这里调用是为了在一开始初始化的时候就能拿到format数据
    WebSocketTest(data);
}
//列表增删方法
function xxx_listAnimate(data) {
    if (data.list[0].listsize){
        if(data.list[0].listsize.lines){
            console.log($(".list_data div").not(".line").length);
            if($(".list_data div").not(".line").length >= data.list[0].listsize.lines+1){
                if(data.list[0].bar_anim){
                    if(data.list[0].bar_anim.speed){
                        $(".list_data>div:first-child").not(".line").hide(data.list[0].bar_anim.speed).remove();
                    }
                }
            }
        }
    }
}

function WebSocketTest(initdata) {
    if ("WebSocket" in window) {
        // 打开一个 web socket
        var ws = new WebSocket("ws://localhost:55555/");
        ws.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            // ws.send("发送数据");
            console.log('这里发送数据');
        };

        ws.onmessage = function (evt) {
            if (evt.data) {
                console.log(initdata.list[0].dm_fans.fans_format.split($));
                var received_msg = evt.data;
                var data = JSON.parse(received_msg);
                // postMessage(data);//把接收到的data数据通过postMessage（）发给webworker，在webworker里面可以使用onmessage（）获取到数据
               if(data.type==="info"){
                   var info = template("infoTemplate",data);
                   $(".info_row").children("table").find("tr").html(info);
               }
                if(data.type==="danmu"){
                    var div_danmu_row = document.createElement("div");
                    div_danmu_row.setAttribute("class","danmu_row");
                    $(".list_data").append(div_danmu_row);
                    if(data.data){
                        if(data.data.user_role==="观众"){
                            var danmu = template("danmuFansTemplate",{'danmuData':data,'initData':initdata});
                            $(".danmu_row").html(danmu);
                        }
                        if(data.data.user_role==="主播"){
                            var danmu = template("danmuAnchorTemplate",{'danmuData':data,'initData':initdata});
                            $(".danmu_row").html(danmu);
                        }
                        if(data.data.user_role==="超管"){
                            var danmu = template("danmuSuperTemplate",{'danmuData':data,'initData':initdata});
                            $(".danmu_row").html(danmu);
                        }
                        if(data.data.user_role==="房管"){
                            var danmu = template("danmuRoomTemplate",{'danmuData':data,'initData':initdata});
                            $(".danmu_row").html(danmu);
                        }
                    }
                    //如果属性值为空表示用户没有勾选，就移除这个span
                    $(".danmu_row span:empty").remove();
                }
                if(data.type==="gift"){
                    var div_gift_row = document.createElement("div");
                    div_gift_row.setAttribute("class","gift_row");
                    $(".list_data").append(div_gift_row);
                    if(data.data){
                        if(data.data.is_free){
                            var gift = template("giftFreeTemplate",{'giftData':data,'initData':initdata});
                            $(".gift_row").html(gift);
                        }else{
                            var gift = template("giftPayTemplate",{'giftData':data,'initData':initdata});
                            $(".gift_row").html(gift);
                        }
                    }
                    //如果属性值为空表示用户没有勾选，就移除这个span
                    $(".gift_row span:empty").remove();
                }
                if(data.type==="join"){
                    var div_join_row = document.createElement("div");
                    div_join_row.setAttribute("class","join_row");
                    $(".list_data").append(div_join_row);
                   if(data.data){
                       if(data.data.user_role==="观众"){
                           var join = template("joinNTemplate",{'joinData':data,'initData':initdata});
                           $(".join_row").html(join);
                       }
                       if(data.data.user_role==="超管"){
                           var join = template("joinSuperTemplate",{'joinData':data,'initData':initdata});
                           $(".join_row").html(join);
                       }
                   }
                    //如果属性值为空表示用户没有勾选，就移除这个span
                    $(".join_row span:empty").remove();
                }
                if(data.type==="follow"){
                    var div_follow_row = document.createElement("div");
                    div_follow_row.setAttribute("class","follow_row");
                    $(".list_data").append(div_follow_row);
                    var follow = template("followTemplate",{'followData':data,'initData':initdata});
                    $(".follow_row").html(follow);
                    //如果属性值为空表示用户没有勾选，就移除这个span
                    $(".follow_row span:empty").remove();
                }
                if(data.type==="notice"){
                    var div_notice_row = document.createElement("div");
                    div_notice_row.setAttribute("class","notice_row");
                    $(".list_data").append(div_notice_row);
                    var notice = template("noticeTemplate",data);
                    $(".notice_row").html(notice);
                    //如果属性值为空表示用户没有勾选，就移除这个span
                    $(".notice_row span:empty").remove();
                }
            }
        };
        ws.onclose = function () {
            // 关闭 websocket
        };
    }else{
        // 浏览器不支持 WebSocket
        console.log("您的浏览器不支持 WebSocket!");
    }
}
// WebSocketTest();
//请求数据的websocket结束