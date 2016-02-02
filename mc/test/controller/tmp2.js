/**
 * Created by Administrator on 2016/1/18 0018.
 */
define([], function () {//"css!../tmp1.css"
    var tmp2=avalon.define({
        $id: 'tmp2'
    });
    return avalon.controller(function($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function(r) {
            root.title="我是模板2"
        };
        // 进入视图
        $ctrl.$onEnter = function(r) {

        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {
        }
    })
});
