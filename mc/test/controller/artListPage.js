/**
 * Created by Administrator on 2016/1/24 0024.
 */
/**
 * Created by Administrator on 2016/1/18 0018.
 */
/**
 * Created by Administrator on 2016/1/18 0018.
 */
define(["jquery","pager"], function ($) {//"css!../tmp1.css"


    var artList=avalon.define({
        $id: 'artList',
        list:[{
            id: null,
            type: null,
            time:null,
            title:null,
            content:null
        }],
        artTypeId:null,
        setType:function(str)
        {
            this.page.type=str;
        },
        //分页
        pager: {
            currentPage: 1,
            perPages: 5,
            showJumper: true,
            alwaysShowNext: true,
            alwaysShowPrev: true,
            totalItems: 0,
            onJump: function(e, data) {
                artList.page.page = data.currentPage;
              //  avalon.router.go("artListPage", {page: data.currentPage,id:artList.page.type});
                getdata();
            }
        },
        page:{
            "type":"为啥没效果",
            "page": 1,
            "pageSize": 5,
            "maxPage": 0,
            "totle": null,
            "username":root.username
        },
        $skipArray: ["pager"]

    });

    function getdata(){

        //  console.log("我是分类的ID："+  artList.page.type);
        // console.log(artList.page.$model);
        $.ajax({
            url :'./php/artList.php',
            type : 'POST',
            dataType:"json",
            data:artList.page.$model,
            success : function(data){
                //   console.log(data);
                if(!$.isEmptyObject(data)){

                    artList.page = {
                        "type":data.page.type,
                        "page": data.page.page,
                        "pageSize":data.page.pageSize,
                        "maxPage":data.page.maxPage,
                        "totle": data.page.totle,
                        "username":data.page.username
                    };
                    artList.list=data.list;
                    //分页
                    //console.log(avalon.vmodels.aa)
                    var a = avalon.vmodels.aa;
                    if (a) {
                        a.totalItems = data.page.totalItems;
                        // console.log("这是总数"+data.page.totalItems);
                        a.currentPage = data.page.page;
                    }
                }
                else{
                    artList.list=[];
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                alert("error");
                console.log('XMLHttpRequest:'+XMLHttpRequest);
                console.log("textStatus:"+textStatus);
            }
        });
    }
    avalon.scan();
    return avalon.controller(function($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function(r) {
            root.title="文章列表";

            //getdata();
        };
        // 进入视图
        $ctrl.$onEnter = function(r) {
            // artList.artTypeId= r.id;
            // artList.page.type= r.id;
            //  console.log(artList.page.$model);
            //重置分页数据
            //  artList.page={
            //      "type":"0",
            //      "page": 1,
            //      "pageSize": 5,
            //      "maxPage": 0,
            //      "totle": null,
            //      "username":root.username
            //  };
            artList.setType(r.id);
            getdata();
            avalon.filters.deleBack = function(str){
                var ret=str.replace(/(style=\"white-space: nowrap;\")|(<br\/>)|(<\/)$|(\\)$|[<]$/g,"");
                return ret;
            }
        };
        $ctrl.onBeforeEnter=function(){


        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {
            //var a = avalon.vmodels.aa;
            //if (a) {
            //    a.totalItems = 1;
            //    a.currentPage = 1;
            //}
        }
    })
});
