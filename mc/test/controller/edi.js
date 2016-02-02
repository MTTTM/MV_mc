/**
 * Created by Administrator on 2016/1/18 0018.
 */
define(["jquery","umeditor","validation","umeditor-config"], function ($,UM) {//"css!../tmp1.css"

    var edi=avalon.define({
        $id: 'edi',
        ediContent:{
            username:root.login.username,
            title:null,
            content:null,
            type:null
        },
        type:null,
        addTypeFn:function(){
           root.TypeArray.push(edi.type);
            addNewType();
        }
    });
    function addNewType(){
        console.log(edi.type);
        $.ajax({
            url :'./php/addType.php',
            type : 'POST',
            data:{type:edi.type},
            dataType:"json",
            success : function(data){
                if(data.status=="1"){
                    alert("新建分类成功")
                }
                else{
                    alert("新建分类失败")
                }
            },
            error:function(){
                console.log('error');
            }
        });
    }
    return avalon.controller(function($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function(r) {
            root.title="文章编辑模块";
            var um = UM.getEditor('myEditor');

            var valid= $('#edi-form').validate({
                rules:{
                    title:{
                        required:true
                    },
                    content:{
                        required:true
                    }
                },
                messages:{

                },
                submitHandler: function()
                {
                    uploadAtc();

                }
            });
               function uploadAtc(){
                 console.log(edi.ediContent.$model);
                   $.ajax({
                       url :'./php/art_edi.php',
                       type : 'POST',
                       data:edi.ediContent.$model,
                       dataType:"json",
                       success : function(data){
                           if(data.status=="1"){
                               alert("提交成功")
                           }
                       },
                       error:function(){
                           console.log('error');
                       }
                   });
               }
        };
        // 进入视图
        $ctrl.$onEnter = function(r) {

        };
        $ctrl.onBeforeEnter=function(){


        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {
            $ctrl.$vmodels = [];
        }
    })
});
