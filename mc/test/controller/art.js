/**
 * Created by Administrator on 2016/1/18 0018.
 */
/**
 * Created by Administrator on 2016/1/18 0018.
 */
define(["jquery","umeditor",,"validation","umeditor-config"], function ($,UM) {//"css!../tmp1.css"

    var art=avalon.define({
        $id: "art",
        artcle:{
            id: null,
            type: null,
            time:null,
            username:null,
            title:null,
            content:null
        },
        post:{
          //  type:null,
            id:null
        }
    });

    return avalon.controller(function($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function(r) {

            root.title="文章阅读";

        };
        // 进入视图
        $ctrl.$onEnter = function(r) {
           // art.post.type= r.id;
            art.post.id= r.id;
            $.ajax({
                url :'./php/art.php',
                type : 'POST',
                dataType:"json",
                data:art.post.$model,
                success : function(data){
                    if(!$.isEmptyObject(data)){
                        art.artcle=data[0];
                       // console.log(art.artcle)
                    }
                    else{
                        art.art=[];
                    }

                },
                error:function(){
                    alert('error');
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
