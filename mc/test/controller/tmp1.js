
define([], function () {//"css!../tmp1.css"
    /*车系*/
    var tmp1=avalon.define({
        $id: 'tmp1'
    });
    return avalon.controller(function($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function(r) {
            root.title="我是模板1"
        };
        // 进入视图
        $ctrl.$onEnter = function(r) {

        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {
        }
    })
});