//别名配置
require.config({
    baseUrl:"list/js",
    paths:{
        'jquery':"jquery-3.2.1",
        'template':"template",
        'test':"test",
    }
});
//引入模块，用变量$表示jquery模块
require(["jquery", 'template'],function ($,template) {
        $(function () {
            $("#btn").click(
                function () {
                    require(['test'],function (test) {

                    })
                }
            )
        })
})
