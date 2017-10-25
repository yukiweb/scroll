<<<<<<< HEAD
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
            if (evt.data) {
                var received_msg = evt.data;
                var data = JSON.parse(received_msg);
                // postMessage(data);//把接收到的data数据通过postMessage（）发给webworker，在webworker里面可以使用onmessage（）获取到数据
                console.log(data)
                var info = template("infoTemplate",data);
                console.log(info)
                $(".info_row").children("table").find("tr").html(info);

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
=======
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
            if (evt.data) {
                var received_msg = evt.data;
                var data = JSON.parse(received_msg);
                // postMessage(data);//把接收到的data数据通过postMessage（）发给webworker，在webworker里面可以使用onmessage（）获取到数据
                console.log(data)
                var info = template("infoTemplate",data);
                console.log(info)
                $(".info_row").children("table").find("tr").html(info);

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
WebSocketTest();