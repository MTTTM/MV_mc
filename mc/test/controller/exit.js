/**
 * Created by Administrator on 2016/1/18 0018.
 */
/**
 * Created by Administrator on 2016/1/18 0018.
 */
define(["jquery","umeditor","validation","umeditor-config"], function ($,UM) {//"css!../tmp1.css"

    var exit=avalon.define({
        $id: 'exit'
    });
    return avalon.controller(function($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function(r) {
            root.title="登出模板";
            //登录

                $.ajax({
                    url :'./php/exit.php',
                    type : 'POST',
                    dataType:"json",
                    success : function(data){
                        if(data.status=="1"){
                            alert("登出成功");
                            root.login.username="";
                            console.log( root.login.username)
                        }
                    },
                    error:function(){
                        console.log('error');
                    }
                });
        };
        // 进入视图
        $ctrl.$onEnter = function(r) {

        };
        $ctrl.onBeforeEnter=function(){


        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {
        }
    })
});
