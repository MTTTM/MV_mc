/**
 * Created by Administrator on 2016/1/23 0023.
 */
/**
 * Created by Administrator on 2016/1/18 0018.
 */
/**
 * Created by Administrator on 2016/1/18 0018.
 */
define(["jquery"], function ($) {//"css!../tmp1.css"

    var artList=avalon.define({
        $id: 'artList',
        setType:function(str)
        {
            this.page.type=str;
        },
        page:{
            "type":"为啥没效果",
            "page": 1,
            "pageSize": 5,
            "maxPage": 0,
            "totle": "300",
            "username":root.username
        }

    });
    function getdata(){
        console.log("我是分类的ID："+  artList.page.type);
        console.log(artList.page.$model);
    }
    return avalon.controller(function($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function(r) {
            alert("dd")
        };
        // 进入视图
        $ctrl.$onEnter = function(r) {
            artList.setType(r.id);
          alert(r.id);
        };
        $ctrl.onBeforeEnter=function(){


        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {
        }
    })
});
