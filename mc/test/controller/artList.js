/**
 * Created by Administrator on 2016/1/18 0018.
 */
/**
 * Created by Administrator on 2016/1/18 0018.
 */
define(["jquery","pager"], function ($) {//"css!../tmp1.css"
    var simplegridVM ;//★★★
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
            totalItems: 1,
            onJump: function(e, data) {
                artList.page.currentPage = data.currentPage;
                avalon.router.go("artListPage", {type:artList.page.type,page: data.currentPage});
                getdata();
            }
            //onInit: function(gridVM) { //★★★
            //    simplegridVM = gridVM; //方便外面调用
            //}
        },
        page:{
            "type":"为啥没效果",
            "currentPage": 1,
            "perPages": 5,
            "totalPages": 0,
            "totalItems": null
        },
        $skipArray: ["pager"]

    });
    function getdata(){
        $.ajax({
            url :'./php/artList.php',
            type : 'POST',
            dataType:"json",
            data:artList.page.$model,
            success : function(data){
                //   console.log(data);
                if(!$.isEmptyObject(data)) {

                    artList.page = {
                        "type": data.page.type,
                        "currentPage": data.page.currentPage,//当前页码
                        "perPages": data.page.perPages//,//每页显示条数
                        // "totalPages":data.page.totalPages//,//总页数
                        // "totalItems": data.page.totalItems//总数量
                    };
                    artList.list = data.list;
                    //分页
                     var bb = avalon.vmodels.aa;
                    artList.$watch("artTypeId", function (a, b) {
                       // console.log("新的：" + a + " 旧的：" + b);
                        if (a) {
                            artList.page.currentPage = 1;

                        }
                    });

                    if (bb) {
                        bb.totalItems = data.page.totalItems;
                        bb.currentPage =  data.page.currentPage;
                    }
                   // simplegridVM= artList.page;
                }
                else{
                    artList.list=[];
                    alert("数据为空")
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                alert("error");
              //  console.log('XMLHttpRequest:'+XMLHttpRequest);
               // console.log("textStatus:"+textStatus);
            }
        });
    }

    avalon.scan();
    return avalon.controller(function($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function(r) {
            root.title="文章列表";
        };
        // 进入视图
        $ctrl.$onEnter = function(r) {
            artList.setType(r.type);
            artList.artTypeId= r.type;
            if(r.page){
                artList.page.currentPage= r.page;
            }
            root.current= r.type;
            getdata();

        };
        $ctrl.onBeforeEnter=function(){
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {
            $ctrl.$vmodels = [];
        }
    })
});
