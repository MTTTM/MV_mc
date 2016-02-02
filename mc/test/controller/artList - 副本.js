/**
 * Created by Administrator on 2016/1/18 0018.
 */
/**
 * Created by Administrator on 2016/1/18 0018.
 */
define(["jquery","umeditor","validation","umeditor-config"], function ($,UM) {//"css!../tmp1.css"

    var artList=avalon.define({
        $id: 'artList',
        list:[{
            id: null,
            type: null,
            time:null,
            title:null,
            content:null
        }],
        artTypeId:null
    });

    return avalon.controller(function($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function(r) {
            root.title="文章列表";
        };
        // 进入视图
        $ctrl.$onEnter = function(r) {
            artList.artTypeId= r.id;
            $.ajax({
                url :'./php/artList.php',
                type : 'POST',
                dataType:"json",
                data:{type: artList.artTypeId},
                success : function(data){
                    if(!$.isEmptyObject(data)){
                     artList.list=data;
                    }
                    else{
                        artList.list=[];
                    }

                },
                error:function(){
                    console.log('error');
                }
            });
        };
        $ctrl.onBeforeEnter=function(){


        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {
        }
    })
});
