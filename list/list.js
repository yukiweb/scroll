<<<<<<< HEAD
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
=======
//样式初始化方法
function xxx_styleInit(data) {
    if(data){
        if(data.count){
            for(var j = 0;j<data.count;j++){

                var div_list_bg = document.createElement("div");
                div_list_bg.setAttribute("class","list_bg"+data.list[j].guid);
                var div_list_content = document.createElement("div");
                div_list_content.setAttribute("class","list_content");
                var div_line = document.createElement("div");
                div_line.setAttribute("class","line");
                var div_list_data = document.createElement('div');
                div_list_data.setAttribute("class","list_data")
                div_list_bg.appendChild(div_list_content);
                div_list_bg.appendChild(div_list_data);
                var body = document.getElementsByTagName("body")[0];
                body.appendChild(div_list_bg);
                // 信息
                // var info_row = document.createElement("table");
                var info_row = document.createElement("div");
                info_row.setAttribute("class","info_row");
                div_list_content.appendChild(info_row);
                div_list_content.appendChild(div_line);
                // info_row.setAttribute("border",0);
                // info_row.setAttribute("cellspacing",0);
                // info_row.setAttribute("cellpadding",0);
                // var tbodyInfo = document.createElement("tbody");
                // info_row.appendChild(tbodyInfo);
                var InfoRoom = document.createElement("div");
                InfoRoom.setAttribute("class","info_room")
                var InfoObs = document.createElement("div");
                InfoObs.setAttribute("class","info_obs")
                var InfoPc = document.createElement("div");
                InfoPc.setAttribute("class","info_pc")
                var InfoXhl = document.createElement("div");
                InfoXhl.setAttribute("class","info_xhl")
                info_row.appendChild(InfoRoom);
                info_row.appendChild(InfoObs);
                info_row.appendChild(InfoPc);
                info_row.appendChild(InfoXhl);
                //room
                var audi_num = document.createElement("div");
                audi_num.setAttribute("class","audi_num")
                var follow_num = document.createElement("div");
                follow_num.setAttribute("class","follow_num")
                var gift_score = document.createElement("div");
                gift_score.setAttribute("class","gift_score");
                var guard_num = document.createElement("div");
                guard_num.setAttribute("class","guard_num");
                var lord_num = document.createElement("div");
                lord_num.setAttribute("class","lord_num");
                var fans_num = document.createElement("div");
                fans_num.setAttribute("class","fans_num");
                InfoRoom.appendChild(audi_num);
                InfoRoom.appendChild(follow_num);
                InfoRoom.appendChild(gift_score);
                InfoRoom.appendChild(guard_num);
                InfoRoom.appendChild(lord_num);
                InfoRoom.appendChild(fans_num);
                //obs
                var frame_loss = document.createElement("td");
                frame_loss.setAttribute("class","frame_loss");
                var fps = document.createElement("td");
                fps.setAttribute("class","fps");
                var bitrate = document.createElement("td");
                bitrate.setAttribute("class","bitrate");
                InfoObs.appendChild(frame_loss);
                InfoObs.appendChild(fps);
                InfoObs.appendChild(bitrate);
                //pc
                var cpurate = document.createElement("td");
                cpurate.setAttribute("class","cpurate");
                var memrate = document.createElement("td");
                memrate.setAttribute("class","memrate");
                InfoPc.appendChild(cpurate);
                InfoPc.appendChild(memrate);
                //xhl
                var startime = document.createElement("td");
                startime.setAttribute("class","startime");
                var time_now = document.createElement("td");
                time_now.setAttribute("class","time_now");
                var dm_num = document.createElement("td");
                dm_num.setAttribute("class","dm_num");
                var gift_num = document.createElement("td");
                gift_num.setAttribute("class","gift_num");
                var new_follow = document.createElement("td");
                new_follow.setAttribute("class","new_follow");
                var speaker_num = document.createElement("td");
                speaker_num.setAttribute("class","speaker_num");
                InfoXhl.appendChild(startime);
                InfoXhl.appendChild(time_now);
                InfoXhl.appendChild(dm_num);
                InfoXhl.appendChild(gift_num);
                InfoXhl.appendChild(new_follow);
                InfoXhl.appendChild(speaker_num);
                //设置初始样式
                $(".info_room").css("overflow","hidden");
                $(".info_obs").css("overflow","hidden");
                $(".info_pc").css("overflow","hidden");
                $(".info_xhl").css("overflow","hidden");
                $(".list_bg"+data.list[j].guid+">.list_content").css("width",$(".list_bg"+data.list[j].guid+">.list_data").width());
                $(".list_bg"+data.list[j].guid).css({
                    "border-radius": "5px",
                    "border":"2px solid #253A7C",
                    "background-color": "rgba(1,26,56,0.8)",
                    "position": "absolute",
                    "top": "0px",
                    "left": "0px"
                });
                if(data.list[j].list_size){
                    $(".list_bg"+data.list[j].guid+">.list_content").css("width",data.list[j].list_size.width)
                    setCss($(".list_bg"+data.list[j].guid+">.list_data"), data.list[j].list_size);
                }
                if(data.list[j].bg) {
                    setCss($(".list_bg"+data.list[j].guid), data.list[j].bg);
                }
                if(data.list[j].position){
                    setCss($(".list_bg"+data.list[j].guid),data.list[j].position);
                }
                if (data.list[j].frame) {
                    if(data.list[j].frame.is_frame){
                        setCss($(".list_bg"+data.list[j].guid), data.list[j].frame);
                    }else{
                        $(".list_bg"+data.list[j].guid).css("border","none")
                    }
                }
                if(data.list[j].bar_bg){
                    //先判断是否需要添加背景色
                    if(data.list[j].bar_bg.is_bar_bg){
                        (function (j) {
                            // 关注
                            $(".list_data").on("DOMNodeInserted",".follow_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .follow_row"),data.list[j].bar_bg);
                            })
                            // 弹幕
                            $(".list_data").on("DOMNodeInserted",".danmu_fans_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .danmu_fans_row"),data.list[j].bar_bg);
                            })
                            $(".list_data").on("DOMNodeInserted",".danmu_anchor_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .danmu_anchor_row"),data.list[j].bar_bg);
                            })
                            $(".list_data").on("DOMNodeInserted",".danmu_super_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .danmu_super_row"),data.list[j].bar_bg);
                            })
                            $(".list_data").on("DOMNodeInserted",".danmu_room_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .danmu_room_row"),data.list[j].bar_bg);
                            })
                            // 信息
                            $(".list_data").on("DOMNodeInserted",".info_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .info_row"),data.list[j].bar_bg);
                            })
                            // 通知
                            $(".list_data").on("DOMNodeInserted",".notice_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .notice_row"),data.list[j].bar_bg);
                            })
                            // 加入
                            $(".list_data").on("DOMNodeInserted",".join_n_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .join_n_row"),data.list[j].bar_bg);
                            })
                            $(".list_data").on("DOMNodeInserted",".join_super_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .join_super_row"),data.list[j].bar_bg);
                            })
                            // 礼物
                            $(".list_data").on("DOMNodeInserted",".gift_free_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .gift_free_row"),data.list[j].bar_bg);
                            })
                            $(".list_data").on("DOMNodeInserted",".gift_pay_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .gift_pay_row"),data.list[j].bar_bg);
                            })
                        })(j)
                    }
                }
                if(data.list[j].bar_frame){
                    if(data.list[j].bar_frame.is_bar_frame){
                        (function (j) {
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".follow_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .follow_row"),data.list[j].bar_frame);
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".danmu_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .danmu_row"),data.list[j].bar_frame);
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".info_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .info_row"),data.list[j].bar_frame);
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".notice_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .notice_row"),data.list[j].bar_frame);
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".join_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .join_row"),data.list[j].bar_frame);
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".gift_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .gift_row"),data.list[j].bar_frame);
                            })
                        })(j)
                    }else{
                        (function (j) {
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".follow_row",function () {
                                $(".list_bg"+data.list[j].guid+" .follow_row").css("border","none")
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".danmu_row",function () {
                                $(".list_bg"+data.list[j].guid+" .danmu_row").css("border","none")
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".info_row",function () {
                                $(".list_bg"+data.list[j].guid+" .info_row").css("border","none")
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".notice_row",function () {
                                $(".list_bg"+data.list[j].guid+" .notice_row").css("border","none")
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".join_row",function () {
                                $(".list_bg"+data.list[j].guid+" .join_row").css("border","none")
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".gift_row",function () {
                                $(".list_bg"+data.list[j].guid+" .gift_row").css("border","none")
                            })
                        })(j)
                    }
                    if(!data.list[j].bar_frame.is_bar_round){
                        (function (j) {
                            // 关注
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".follow_row",function () {
                                $(".list_bg"+data.list[j].guid+" .follow_row").css("border-radius","unset")
                            })
                            // 弹幕
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".danmu_fans_row",function () {
                                $(".list_bg"+data.list[j].guid+" .danmu_fans_row").css("border-radius","unset")
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".danmu_anchor_row",function () {
                                $(".list_bg"+data.list[j].guid+" .danmu_anchor_row").css("border-radius","unset")
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".danmu_super_row",function () {
                                $(".list_bg"+data.list[j].guid+" .danmu_super_row").css("border-radius","unset")
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".danmu_room_row",function () {
                                $(".list_bg"+data.list[j].guid+" .danmu_room_row").css("border-radius","unset")
                            })
                            // 信息
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".info_row",function () {
                                $(".list_bg"+data.list[j].guid+" .info_row").css("border-radius","unset")
                            })
                            // 通知
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".notice_row",function () {
                                $(".list_bg"+data.list[j].guid+" .notice_row").css("border-radius","unset")
                            })
                            // 加入
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".join_super_row",function () {
                                $(".list_bg"+data.list[j].guid+" .join_super_row").css("border-radius","unset")
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".join_n_row",function () {
                                $(".list_bg"+data.list[j].guid+" .join_n_row").css("border-radius","unset")
                            })
                            // 礼物
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".gift_free_row",function () {
                                $(".list_bg"+data.list[j].guid+" .gift_free_row").css("border-radius","unset")
                            })
                            $(".list_bg"+data.list[j].guid).on("DOMNodeInserted",".gift_pay_row",function () {
                                $(".list_bg"+data.list[j].guid+" .gift_pay_row").css("border-radius","unset")
                            })
                        })(j)
                    }
                }
                // 1.信息样式
                // 1.1 room信息
                (function (j) {
                    if(data.list[j].info_room){
                        if(data.list[j].info_room.is_room){
                            setCss($(".list_bg"+data.list[j].guid+" .info_room"),data.list[j].info_room);
                            if(!data.list[j].info_room.is_room_numdetail){
                                $(".list_bg"+data.list[j].guid+" .info_room>.gift_score").css("display","none");
                            }
                            if(!data.list[j].info_room.is_numfans){
                                $(".list_bg"+data.list[j].guid+" .info_room>.audi_num").css("display","none");
                            }
                            if(!data.list[j].info_room.is_numfollow){
                                $(".list_bg"+data.list[j].guid+" .info_room>.follow_num").css("display","none");
                            }
                            if(!data.list[j].info_room.is_numgift){
                                $(".list_bg"+data.list[j].guid+" .info_room>.gift_score").css("display","none");
                            }
                            if(!data.list[j].info_room.is_guard){
                                $(".list_bg"+data.list[j].guid+" .info_room>.guard_num").css("display","none");
                            }
                            if(!data.list[j].info_room.is_lord){
                                $(".list_bg"+data.list[j].guid+" .info_room>.lord_num").css("display","none");
                            }
                            if(!data.list[j].info_room.is_fans){
                                $(".list_bg"+data.list[j].guid+" .info_room>.fans_num").css("display","none");
                            }
                            if($(".list_bg"+data.list[j].guid+" .info_room").children().not(":hidden").length==1){
                                $(".list_bg"+data.list[j].guid+" .info_room td").css({
                                    "width":"100%"
                                })
                            }
                            if($(".list_bg"+data.list[j].guid+" .info_room").children().not(":hidden").length==2){
                                $(".list_bg"+data.list[j].guid+" .info_room").children().not(":hidden").first().css({
                                    "width":"50%",
                                    "float":"left"
                                }
                                )
                                $(".list_bg"+data.list[j].guid+" .info_room").children().not(":hidden").last().css({
                                    "width":"50%",
                                    "float":"right",
                                    "text-align":"right"
                                })
                            }
                            if($(".list_bg"+data.list[j].guid+" .info_room").children().not(":hidden").length==3){
                                $(".list_bg"+data.list[j].guid+" .info_room").children().not(":hidden").find("td").css({
                                    "width":"33.33%"
                                })
                            }
                            if($(".list_bg"+data.list[j].guid+" .info_room").children().not(":hidden").length==4){
                                $(".list_bg"+data.list[j].guid+" .info_room").children().not(":hidden").find("td").css({
                                    "width":"33.33%"
                                })
                            }
                            if($(".list_bg"+data.list[j].guid+" .info_room").children().not(":hidden").length==5){
                                $(".list_bg"+data.list[j].guid+" .info_room").children().not(":hidden").find("td").css({
                                    "width":"33.33%"
                                })
                            }
                            if($(".list_bg"+data.list[j].guid+" .info_room").children().not(":hidden").length==6){
                                $(".list_bg"+data.list[j].guid+" .info_room").children().not(":hidden").find("td").css({
                                    "width":"33.33%"
                                })
                            }
                        }else{
                            $(".list_bg"+data.list[j].guid+" .info_room").css("display","none");
                        }
                    }
                    // 1.2 obs信息
                    if(data.list[j].info_obs){
                        if(data.list[j].info_obs.is_obs){
                            setCss($(".list_bg"+data.list[j].guid+" .info_obs"),data.list[j].info_obs);
                            if(!data.list[j].info_obs.is_frameloss){
                                $(".list_bg"+data.list[j].guid+" .info_obs>.frame_loss").css("display","none");
                            }
                            if(!data.list[j].info_obs.is_fps){
                                $(".list_bg"+data.list[j].guid+" .info_obs>.fps").css("display","none");
                            }
                            if(!data.list[j].info_obs.is_bitrate){
                                $(".list_bg"+data.list[j].guid+" .info_obs>.bitrate").css("display","none");
                            }
                            if($(".list_bg"+data.list[j].guid+" .info_obs").children().not(":hidden").length==3){
                                $(".list_bg"+data.list[j].guid+" .info_obs").children().not(":hidden").first().css({
                                    "float":"left",
                                    "width":"33.33%"
                                })
                                $(".list_bg"+data.list[j].guid+" .info_obs").children().not(":hidden").first().next().css({
                                    "float":"left",
                                    "width":"33.33%",
                                    "text-align":"center"
                                })
                                $(".list_bg"+data.list[j].guid+" .info_obs").children().not(":hidden").last().css({
                                    "float":"left",
                                    "width":"33.33%",
                                    "text-align":"right"
                                })
                            }
                        }
                    }
                    // 1.3 pc信息
                    if(data.list[j].info_pc){
                        if(data.list[j].info_pc.is_pc){
                            setCss($(".list_bg"+data.list[j].guid+" .info_pc"),data.list[j].info_pc);
                            if(!data.list[j].info_pc.is_cpurate){
                                $(".list_bg"+data.list[j].guid+" .info_pc>.cpurate").css("display","none");
                            }
                            if(!data.list[j].info_pc.is_memoryrate){
                                $(".list_bg"+data.list[j].guid+" .info_pc>.memrate").css("display","none");
                            }
                            if($(".list_bg"+data.list[j].guid+" .info_pc").children().not(":hidden").length==2){
                                $(".list_bg"+data.list[j].guid+" .info_pc").children().not(":hidden").first().css({
                                    "width":"50%",
                                    "float":"left"
                                })
                                $(".list_bg"+data.list[j].guid+" .info_pc").children().not(":hidden").last().css({
                                    "width":"50%",
                                    "float":"right",
                                    "text-align":"right"
                                })
                            }
                        }
                    }
                    // 1.4 xhl信息
                    if(data.list[j].info_xhl){
                        if(data.list[j].info_xhl.is_xhl){
                            setCss($(".list_bg"+data.list[j].guid+" .info_xhl"),data.list[j].info_xhl);
                            if(!data.list[j].info_xhl.is_xhl_startsecond){
                                $(".list_bg"+data.list[j].guid+" .info_xhl>.startime").css("display","none");
                            }
                            if(!data.list[j].info_xhl.is_xhl_stampnow){
                                $(".list_bg"+data.list[j].guid+" .info_xhl>.time_now").css("display","none");
                            }
                            if(!data.list[j].info_xhl.is_xhl_numdanmu){
                                $(".list_bg"+data.list[j].guid+" .info_xhl>.dm_num").css("display","none");
                            }
                            if(!data.list[j].info_xhl.is_xhl_numgift){
                                $(".list_bg"+data.list[j].guid+" .info_xhl>.gift_num").css("display","none");
                            }
                            if(!data.list[j].info_xhl.is_xhl_newfollow){
                                $(".list_bg"+data.list[j].guid+" .info_xhl>.new_follow").css("display","none");
                            }
                            if(!data.list[j].info_xhl.is_xhl_numspeaker){
                                $(".list_bg"+data.list[j].guid+" .info_xhl>.speaker_num").css("display","none");
                            }
                        }
                    }
                })(j)
                // 2.弹幕样式
                // 2.1粉丝弹幕
                if(data.list[j].dm_fans){
                        if(data.list[j].dm_fans.show_fans){

                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_fans_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .danmu_fans_row span"),data.list[j].dm_fans);
                                })
                            })(j)
                        if(data.list[j].dm_fans.role){
                            if(data.list[j].dm_fans.role.show){
                                (function (j) {
                                    $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_fans_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_fans_row .danmu_fans>.user_role_fans"),data.list[j].dm_fans.role);
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_fans.fans_name){
                            if(data.list[j].dm_fans.fans_name.show){
                                (function (j) {
                                     $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_fans_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_fans_row .danmu_fans>.user_name_fans"),data.list[j].dm_fans.fans_name);
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_fans.content){
                            if(data.list[j].dm_fans.content.show){
                                (function (j) {
                                     $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_fans_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_fans_row .danmu_fans>.content_fans"),data.list[j].dm_fans.content);
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_fans.level){
                            if(data.list[j].dm_fans.level.show){
                                (function (j) {
                                     $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_fans_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_fans_row .danmu_fans>.user_level_fans"),data.list[j].dm_fans.level);
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_fans.fans_icon){
                            if(!data.list[j].dm_fans.fans_icon.show){
                                (function (j) {
                                     $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_fans_row",function () {
                                        $(".list_bg"+data.list[j].guid+" .danmu_fans_row .danmu_fans>.user_icon_fans").css("display","none");
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_fans.rorank){
                            if(data.list[j].dm_fans.rorank.show){
                                (function (j) {
                                     $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_fans_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_fans_row .danmu_fans>.user_rorank_fans"),data.list[j].dm_fans.rorank);
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_fans.ralord){
                            if(data.list[j].dm_fans.ralord.show){
                                (function (j) {
                                     $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_fans_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_fans_row .danmu_fans>.user_ralord_fans"),data.list[j].dm_fans.ralord);
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_fans.vip){
                            if(data.list[j].dm_fans.vip.show){
                                (function (j) {
                                     $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_fans_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_fans_row .danmu_fans>.user_vip_fans"),data.list[j].dm_fans.vip);
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_fans.sendt){
                            if(data.list[j].dm_fans.sendt.show){
                                (function (j) {
                                     $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_fans_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_fans_row .danmu_fans>.send_time_fans"),data.list[j].dm_fans.sendt);
                                    })
                                })(j)
                            }
                        }
                    }
                }
                // 2.2主播弹幕
                if(data.list[j].dm_anchor){
                        if(data.list[j].dm_anchor.show_anchor){
                            (function (j) {
                                 $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_anchor_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .danmu_anchor_row span"),data.list[j].dm_anchor);
                                })
                            })(j)

                            if(data.list[j].dm_anchor.role){
                                if(data.list[j].dm_anchor.role.show){
                                    (function (j) {
                                         $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_anchor_row",function () {
                                            setCss($(".list_bg"+data.list[j].guid+" .danmu_anchor_row .danmu_anchor>.user_role_anchor"),data.list[j].dm_anchor.role);
                                        })
                                    })(j)
                                }
                            }
                            if(data.list[j].dm_anchor.anchor_name){
                                if(data.list[j].dm_anchor.anchor_name.show){
                                    (function (j) {
                                         $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_anchor_row",function () {
                                            setCss($(".list_bg"+data.list[j].guid+" .danmu_anchor_row .danmu_anchor>.user_name_anchor"),data.list[j].dm_anchor.anchor_name);
                                        })
                                    })(j)
                                }
                            }
                            if(data.list[j].dm_anchor.content){
                                if(data.list[j].dm_anchor.content.show){
                                    (function (j) {
                                         $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_anchor_row",function () {
                                            setCss($(".list_bg"+data.list[j].guid+" .danmu_anchor_row .danmu_anchor>.content_anchor"),data.list[j].dm_anchor.content);
                                        })
                                    })(j)
                                }
                            }
                            if(data.list[j].dm_anchor.time){
                                if(data.list[j].dm_anchor.time.show){
                                    (function (j) {
                                         $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_anchor_row",function () {
                                            setCss($(".list_bg"+data.list[j].guid+" .danmu_anchor_row .danmu_anchor>.send_time_anchor"),data.list[j].dm_anchor.time);
                                        })
                                    })(j)
                                }
                            }
                        }
                    }
                // 2.3超管弹幕
                if(data.list[j].dm_super){
                    if(data.list[j].dm_super.show_super){
                        (function (j) {
                            $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_super_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .danmu_super_row span"),data.list[j].dm_super);
                            })
                        })(j)
                        if(data.list[j].dm_super.role){
                            if(data.list[j].dm_super.role.show){
                                (function (j) {
                                    $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_super_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_super_row .danmu_super>.user_role_super"),data.list[j].dm_super.role);
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_super.super_name){
                            if(data.list[j].dm_super.super_name.show){
                                (function (j) {
                                    $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_super_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_super_row .danmu_super>.user_name_super"),data.list[j].dm_super.super_name);
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_super.content){
                            if(data.list[j].dm_super.content.show){
                                (function (j) {
                                    $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_super_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_super_row .danmu_super>.content_super"),data.list[j].dm_super.content);
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_super.time){
                            if(data.list[j].dm_super.time.show){
                                (function (j) {
                                    $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_super_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_super_row .danmu_super>.send_time_super"),data.list[j].dm_super.time);
                                    })
                                })(j)
                            }
                        }
                    }
                }
                // 2.4房管弹幕
                if(data.list[j].dm_rm){
                    if(data.list[j].dm_rm.show_rm){
                        (function (j) {
                            $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_room_row",function () {
                                setCss($(".list_bg"+data.list[j].guid+" .danmu_room_row span"),data.list[j].dm_rm);
                            })
                        })(j)
                        if(data.list[j].dm_rm.role){
                            if(data.list[j].dm_rm.role.show){
                                (function (j) {
                                    $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_room_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_room_row .danmu_room>.user_role_rm"),data.list[j].dm_rm.role);
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_rm.rm_name){
                            if(data.list[j].dm_rm.rm_name.show){
                                (function (j) {
                                    $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_room_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_room_row .danmu_room>.user_name_rm"),data.list[j].dm_rm.rm_name);
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_rm.content){
                            if(data.list[j].dm_rm.content.show){
                                (function (j) {
                                    $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_room_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_room_row .danmu_room>.content_rm"),data.list[j].dm_rm.content);
                                    })
                                })(j)
                            }
                        }
                        if(data.list[j].dm_rm.time){
                            if(data.list[j].dm_rm.time.show){
                                (function (j) {
                                    $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".danmu_room_row",function () {
                                        setCss($(".list_bg"+data.list[j].guid+" .danmu_room_row .danmu_room>.send_time_rm"),data.list[j].dm_rm.time);
                                    })
                                })(j)
                            }
                        }
                    }
                }
                //3.礼物样式设置
                // 3.1免费礼物样式
                if(data.list[j].gift_free){
                    (function (j) {
                        $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_free_row",function () {
                            setCss($(".list_bg"+data.list[j].guid+" .gift_free_row span"),data.list[j].gift_free);
                        })
                    })(j)
                    if(data.list[j].gift_free.gift_name){
                        if(data.list[j].gift_free.gift_name.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_free_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_free_row .gift_free>.gift_name_free"),data.list[j].gift_free.gift_name);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_free.gift_number){
                        if(data.list[j].gift_free.gift_number.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_free_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_free_row .gift_free>.gift_number_free"),data.list[j].gift_free.gift_number);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_free.gift_combo){
                        if(data.list[j].gift_free.gift_combo.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_free_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_free_row .gift_free>.gift_combo_free"),data.list[j].gift_free.gift_combo);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_free.user_name){
                        if(data.list[j].gift_free.user_name.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_free_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_free_row .gift_free>.user_name_free"),data.list[j].gift_free.user_name);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_free.level){
                        if(data.list[j].gift_free.level.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_free_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_free_row .gift_free>.user_level_free"),data.list[j].gift_free.level);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_free.rank){
                        if(data.list[j].gift_free.rank.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_free_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_free_row .gift_free>.user_rank_free"),data.list[j].gift_free.rank);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_free.rorank){
                        if(data.list[j].gift_free.rorank.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_free_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_free_row .gift_free>.user_rorank_free"),data.list[j].gift_free.rorank);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_free.ralord){
                        if(data.list[j].gift_free.ralord.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_free_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_free_row .gift_free>.user_ralord_free"),data.list[j].gift_free.ralord);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_free.vip){
                        if(data.list[j].gift_free.vip.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_free_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_free_row .gift_free>.user_vip_free"),data.list[j].gift_free.vip);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_free.time){
                        if(data.list[j].gift_free.time.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_free_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_free_row .gift_free>.send_time_free"),data.list[j].gift_free.time);
                                })
                            })(j)
                        }
                    }
                }
                // 3.2付费礼物样式
                if(data.list[j].gift_pay){
                    (function (j) {
                        $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_pay_row",function () {
                            setCss($(".list_bg"+data.list[j].guid+" .gift_pay_row span"),data.list[j].gift_pay);
                        })
                    })(j)
                    if(data.list[j].gift_pay.gift_name){
                        if(data.list[j].gift_pay.gift_name.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_pay_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_pay_row .gift_pay>.gift_name_pay"),data.list[j].gift_pay.gift_name);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_pay.gift_number){
                        if(data.list[j].gift_pay.gift_number.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_pay_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_pay_row .gift_pay>.gift_number_pay"),data.list[j].gift_pay.gift_number);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_pay.gift_combo){
                        if(data.list[j].gift_pay.gift_combo.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_pay_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_pay_row .gift_pay>.gift_combo_pay"),data.list[j].gift_pay.gift_combo);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_pay.user_name){
                        if(data.list[j].gift_pay.user_name.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_pay_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_pay_row .gift_pay>.user_name_pay"),data.list[j].gift_pay.user_name);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_pay.level){
                        if(data.list[j].gift_pay.level.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_pay_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_pay_row .gift_pay>.user_level_pay"),data.list[j].gift_pay.level);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_pay.rank){
                        if(data.list[j].gift_pay.rank.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_pay_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_pay_row .gift_pay>.user_rank_pay"),data.list[j].gift_pay.rank);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_pay.rorank){
                        if(data.list[j].gift_pay.rorank.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_pay_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_pay_row .gift_pay>.user_rorank_pay"),data.list[j].gift_pay.rorank);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_pay.ralord){
                        if(data.list[j].gift_pay.ralord.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_pay_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_pay_row .gift_pay>.user_ralord_pay"),data.list[j].gift_pay.ralord);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_pay.vip){
                        if(data.list[j].gift_pay.vip.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_pay_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_pay_row .gift_pay>.user_vip_pay"),data.list[j].gift_pay.vip);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].gift_pay.time){
                        if(data.list[j].gift_pay.time.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".gift_pay_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .gift_pay_row .gift_pay>.send_time_pay"),data.list[j].gift_pay.time);
                                })
                            })(j)
                        }
                    }
                }
                //4.进入房间样式设置
                // 4.1观众进入房间
                if(data.list[j].join_n){
                    (function (j) {
                        $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_n_row",function () {
                            setCss($(".list_bg"+data.list[j].guid+" .join_n_row span"),data.list[j].join_n);
                        })
                    })(j)
                    if(data.list[j].join_n.role){
                        if(data.list[j].join_n.role.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_n_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .join_n_row .join_n>.user_role_nor"),data.list[j].join_n.role);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].join_n.user_name){
                        if(data.list[j].join_n.user_name.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_n_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .join_n_row .join_n>.user_name_nor"),data.list[j].join_n.user_name);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].join_n.vehicle){
                        if(data.list[j].join_n.vehicle.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_n_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .join_n_row .join_n>.vehicle_nor"),data.list[j].join_n.vehicle);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].join_n.action){
                        if(data.list[j].join_n.action.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_n_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .join_n_row .join_n>.action_nor"),data.list[j].join_n.action);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].join_n.level){
                        if(data.list[j].join_n.level.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_n_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .join_n_row .join_n>.user_level_nor"),data.list[j].join_n.level);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].join_n.rank){
                        if(data.list[j].join_n.rank.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_n_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .join_n_row .join_n>.user_rank_nor"),data.list[j].join_n.rank);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].join_n.rorank){
                        if(data.list[j].join_n.rorank.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_n_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .join_n_row .join_n>.user_rorank_nor"),data.list[j].join_n.rorank);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].join_n.ralord){
                        if(data.list[j].join_n.ralord.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_n_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .join_n_row .join_n>.user_ralord_nor"),data.list[j].join_n.ralord);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].join_n.vip){
                        if(data.list[j].join_n.vip.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_n_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .join_n_row .join_n>.user_vip_nor"),data.list[j].join_n.vip);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].join_n.time){
                        if(data.list[j].join_n.time.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_n_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .join_n_row .join_n>.join_time_nor"),data.list[j].join_n.time);
                                })
                            })(j)
                        }
                    }
                }
                // 4.2超管进入房间
                if(data.list[j].join_super){
                    (function (j) {
                        $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_super_row",function () {
                            setCss($(".list_bg"+data.list[j].guid+" .join_super_row span"),data.list[j].join_super);
                        })
                    })(j)
                    if(data.list[j].join_super.role){
                        if(data.list[j].join_super.role.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_super_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .join_super_row .join_super>.user_role_super"),data.list[j].join_super.role);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].join_super.user_name){
                        if(data.list[j].join_super.user_name.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_super_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .join_super_row .join_super>.user_name_super"),data.list[j].join_super.user_name);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].join_super.time){
                        if(data.list[j].join_super.time.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".join_super_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .join_super_row .join_super>.join_time_super"),data.list[j].join_super.time);
                                })
                            })(j)
                        }
                    }
                }
                //5.关注样式设置
                if(data.list[j].follow){
                    (function (j) {
                        $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".follow_row",function () {
                            setCss($(".list_bg"+data.list[j].guid+" .follow_row span"),data.list[j].follow);
                        })
                    })(j)
                    if(data.list[j].follow.role){
                        if(data.list[j].follow.role.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".follow_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .follow_row .follow>.user_role"),data.list[j].follow.role);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].follow.user_name){
                        if(data.list[j].follow.user_name.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".follow_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .follow_row .follow>.user_name"),data.list[j].follow.user_name);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].follow.level){
                        if(data.list[j].follow.level.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".follow_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .follow_row .follow>.user_level"),data.list[j].follow.level);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].follow.rank){
                        if(data.list[j].follow.rank.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".follow_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .follow_row .follow>.user_rank"),data.list[j].follow.rank);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].follow.rorank){
                        if(data.list[j].follow.rorank.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".follow_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .follow_row .follow>.user_rorank"),data.list[j].follow.rorank);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].follow.ralord){
                        if(data.list[j].follow.ralord.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".follow_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .follow_row .follow>.user_ralord"),data.list[j].follow.ralord);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].follow.vip){
                        if(data.list[j].follow.vip.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".follow_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .follow_row .follow>.user_vip"),data.list[j].follow.vip);
                                })
                            })(j)
                        }
                    }
                    if(data.list[j].follow.time){
                        if(data.list[j].follow.time.show){
                            (function (j) {
                                $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".follow_row",function () {
                                    setCss($(".list_bg"+data.list[j].guid+" .follow_row .follow>.follow_time"),data.list[j].follow.time);
                                })
                            })(j)
                        }
                    }
                }
                //6.通知样式设置
                if(data.list[j].notice){
                    (function (j) {
                        $(".list_bg"+data.list[j].guid+">.list_data").on("DOMNodeInserted",".notice_row",function () {
                            setCss($(".list_bg"+data.list[j].guid+" .notice_row .notice>span"),data.list[j].notice);
                        })
                    })(j)
                }
            }
        }
    }
    WebSocketTest();
}
function xxx_listAnimate(dom) {
    $(dom).children().last("div").children().first("table").remove();
}

function WebSocketTest() {
    if ("WebSocket" in window) {
        // 打开一个 web socket
        var ws = new WebSocket("ws://localhost:55555/");
        ws.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            // ws.send("发送数据");
            console.log('这里发送数据');
        };

        ws.onmessage = function (evt) {
            function tdNumber(dom) {
                var aLi =$(dom).children()
                var w = $(dom).width()/aLi.length;//通过容器的宽度除以li的个数来计算每个li的宽度
                for(var i=0;i<aLi.length;i++){
                    aLi[i].style.width = w + 'px';
                }
            }
            if (evt.data) {
                var received_msg = evt.data;
                var data = JSON.parse(received_msg);
                // postMessage(data);//把接收到的data数据通过postMessage（）发给webworker，在webworker里面可以使用onmessage（）获取到数据
                if(data.type==="info"){
                    for(var i = 0;i<data.update.list.length;i++){
                        // 1.room信息数据
                        $(".list_bg"+data.update.list[i]+" .info_room>.audi_num").html(data.data.audi_num);
                        $(".list_bg"+data.update.list[i]+" .info_room>.follow_num").html(data.data.follow_num);
                        $(".list_bg"+data.update.list[i]+" .info_room>.gift_score").html(data.data.gift_score);
                        $(".list_bg"+data.update.list[i]+" .info_room>.guard_num").html(data.data.guard_num);
                        $(".list_bg"+data.update.list[i]+" .info_room>.lord_num").html(data.data.lord_num);
                        $(".list_bg"+data.update.list[i]+" .info_room>.fans_num").html(data.data.fans_num);
                        // 判断房间信息里的td数，实现不同布局
                        // 2.obs信息数据
                        $(".list_bg"+data.update.list[i]+" .info_obs>.frame_loss").html(data.data.frame_loss);
                        $(".list_bg"+data.update.list[i]+" .info_obs>.fps").html(data.data.fps);
                        $(".list_bg"+data.update.list[i]+" .info_obs>.bitrate").html(data.data.bitrate);
                        // 判断obs信息里的td数，实现不同布局
                        // 3.pc信息数据
                        $(".list_bg"+data.update.list[i]+" .info_pc>.cpurate").html(data.data.cpurate);
                        $(".list_bg"+data.update.list[i]+" .info_pc>.memrate").html(data.data.memrate);
                        // 判断pc信息里的td数，实现不同布局
                        // 4.xhl信息数据
                        $(".list_bg"+data.update.list[i]+" .info_xhl>.startime").html(data.data.startime);
                        $(".list_bg"+data.update.list[i]+" .info_xhl>.time_now").html(data.data.time_now);
                        $(".list_bg"+data.update.list[i]+" .info_xhl>.dm_num").html(data.data.dm_num);
                        $(".list_bg"+data.update.list[i]+" .info_xhl>.gift_num").html(data.data.gift_num);
                        $(".list_bg"+data.update.list[i]+" .info_xhl>.new_follow").html(data.data.new_follow);
                        $(".list_bg"+data.update.list[i]+" .info_xhl>.speaker_num").html(data.data.speaker_num);
                        // 判断xhl信息里的td数，实现不同布局
                    }
                }
                if(data.type==="danmu"){
                    for(var i = 0;i<data.update.list.length;i++){
                        // var div_danmu_row = document.createElement("div");
                        // div_danmu_row.setAttribute("class","danmu_row");
                        // $(".list_bg"+data.update.list[i]+">.list_data").append(div_danmu_row);
                        if(data.data){
                            if(data.data.user_role==="观众"){
                                var danmu = template("danmuFansTemplate",data);
                                $(".list_bg"+data.update.list[i]+">.list_data").append(danmu);
                            }
                            if(data.data.user_role==="主播"){
                                var danmu = template("danmuAnchorTemplate",data);
                                $(".list_bg"+data.update.list[i]+">.list_data").append(danmu);
                            }
                            if(data.data.user_role==="超管"){
                                var danmu = template("danmuSuperTemplate",data);
                                $(".list_bg"+data.update.list[i]+">.list_data").append(danmu);
                            }
                            if(data.data.user_role==="房管"){
                                var danmu = template("danmuRoomTemplate",data);
                                $(".list_bg"+data.update.list[i]+">.list_data").append(danmu);
                            }
                        }
                    }
                    //如果属性值为空表示用户没有勾选，就移除这个span
                    $(".danmu_row span:empty").remove();
                }
                if(data.type==="gift"){
                    for(var i = 0;i<data.update.list.length;i++){
                        // var div_gift_row = document.createElement("div");
                        // div_gift_row.setAttribute("class","gift_row");
                        // $(".list_bg"+data.update.list[i]+">.list_data").append(div_gift_row);
                        if(data.data){
                            if(data.data.is_free){
                                var gift = template("giftFreeTemplate",data);
                                $(".list_bg"+data.update.list[i]+">.list_data").append(gift);
                            }else{
                                var gift = template("giftPayTemplate",data);
                                $(".list_bg"+data.update.list[i]+">.list_data").append(gift);
                            }
                        }
                    }
                    //如果属性值为空表示用户没有勾选，就移除这个span
                    $(".gift_row span:empty").remove();
                }
                if(data.type==="join"){
                    for(var i = 0;i<data.update.list.length;i++){
                        // var div_join_row = document.createElement("div");
                        // div_join_row.setAttribute("class","join_row");
                        // $(".list_bg"+data.update.list[i]+">.list_data").append(div_join_row);
                        if(data.data){
                            if(data.data.user_role==="观众"){
                                var join = template("joinNTemplate",data);
                                $(".list_bg"+data.update.list[i]+">.list_data").append(join);
                            }
                            if(data.data.user_role==="超管"){
                                var join = template("joinSuperTemplate",data);
                                $(".list_bg"+data.update.list[i]+">.list_data").append(join);
                            }
                        }
                    }
                    //如果属性值为空表示用户没有勾选，就移除这个span
                    $(".join_row span:empty").remove();
                }
                if(data.type==="follow"){
                    for(var i = 0;i<data.update.list.length;i++){
                        // var div_follow_row = document.createElement("div");
                        // div_follow_row.setAttribute("class","follow_row");
                        // $(".list_bg"+data.update.list[i]+">.list_data").append(div_follow_row);
                        var follow = template("followTemplate",data);
                        $(".list_bg"+data.update.list[i]+">.list_data").append(follow);
                    }
                    //如果属性值为空表示用户没有勾选，就移除这个span
                    $(".follow_row span:empty").remove();
                }
                if(data.type==="notice"){
                    for(var i = 0;i<data.update.list.length;i++){
                        // var div_notice_row = document.createElement("div");
                        // div_notice_row.setAttribute("class","notice_row");
                        // $(".list_bg"+data.update.list[i]+">.list_data").append(div_notice_row);
                        var notice = template("noticeTemplate",data);
                        $(".list_bg"+data.update.list[i]+">.list_data").append(notice);
                    }
                    //如果属性值为空表示用户没有勾选，就移除这个span
                    $(".notice_row span:empty").remove();
                }
                // 列表向上滚动方法
                for(var k = 0;k<$("div[class*='list_bg']").length;k++){
                    $("div[class*='list_bg']").get(k).lastChild.style.overflowY="scroll";
                    $("div[class*='list_bg']").get(k).lastChild.style.overflowY="hidden";
                    $("div[class*='list_bg']").get(k).lastChild.style.overflowX="hidden";
                    (function boxScroll(o){
                        o.scrollTop = o.scrollHeight;
                    })($("div[class*='list_bg']").get(k).lastChild)
                    //列表内data部分数据条数的界限
                    if($("div[class*='list_bg']").get(k).lastChild.childNodes.length>50){
                        $($("div[class*='list_bg']").get(k).lastChild).children().first().remove();
                    }
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
>>>>>>> ‘第二次修改’
//请求数据的websocket结束