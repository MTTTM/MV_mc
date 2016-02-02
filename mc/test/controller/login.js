/**
 * Created by Administrator on 2016/1/18 0018.
 */
/**
 * Created by Administrator on 2016/1/18 0018.
 */
define(["jquery","umeditor","validation","umeditor-config"], function ($,UM) {//"css!../tmp1.css"

    var login=avalon.define({
        $id: 'login'
    });
    return avalon.controller(function($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function(r) {
            root.title="我是登录模板";
            var valid= $('#login-form').validate({
                rules:{
                    userName:{
                        required:true
                    },
                    password:{
                        required:true
                    }
                },
                messages:{

                },
                submitHandler: function()
                {
                   login();

                }
        });
            //登录
            function login(){
                $.ajax({
                    url :'./php/login.php',
                    type : 'POST',
                    data:root.login.$model,
                    dataType:"json",
                    success : function(data){
                        if(data.status=="1"){
                         alert("登录成功")
                        }
                        else{
                            alert("密码或用户名错误")
                        }
                    },
                    error:function(){
                        alert('error');
                    }
                });
                return false;
            }

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
