/**
 * Created by Administrator on 2016/1/23 0023.
 */
    //文章列表
require(["ready!", "mmState"], function() {
    avalon.state('artList', {
        url: '/artList/:id',
        controller: "root",
        views: {
            '': {
                controllerUrl: "./controller/ctr.js",
                templateUrl: 'tpl/artList.html'
            }
        }
    });
//启动路由
    avalon.history.start({});
//go!!!!!!!!!
    avalon.scan();
});