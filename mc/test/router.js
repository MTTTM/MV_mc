var root;
require(["avalon","jquery","mmState"], function(avalon) {
    //根model
 root=avalon.define({
     $id:"root",
     title:null,
     login:{
         username:null,
         password:null
     },
     TypeArray:[],
     currentPage:1,
     current:null //当前对应的左侧菜单分类
 });

    //判断是否已经登录
    $.ajax({
        url: './php/session.php',
        type: 'GET',
        dataType: "json",
        success: function (data) {
            if (data.status == 1) {
              root.login.username=data.username;

            }
            else {
                //如果为登录就进入登录页面
                avalon.router.navigate("/login")
            }
        },
        error: function () {
            alert('error');
        }
    });
    //获取文章列表
    $.ajax({
        url :'./php/artType.php',
        type : 'POST',
        dataType:"json",
        success : function(data){
            if(!$.isEmptyObject(data)){
                root.TypeArray=data;
            }
            else{
                console.log("获取文章目录失败");
            }
        },
        error:function(){
            alert.log('error');
        }
    });

    //avalon.filters.replace = function(str, args, args2){//str为管道符之前计算得到的结果，默认框架会帮你传入，此方法必须返回一个值
    //    /* 具体逻辑 */
    //    console.log(ret);
    //    var ret=str.replace(/(&lt;)/g, "");
    //    return ret;
    //};
    $("#troggle").click(function(){
        avalon.router.navigate("/tmp2")
    });
    //首页
    avalon.state('index', {
        url: '/',
        controller: "root",
        views: {
            '': {
                controllerUrl: "./controller/tmp1.js",
                templateUrl: 'tmp1.html'
            }
        }
    });
        //模板2
    avalon.state('type', {
        url: '/tmp2',
        controller: "root",
        views: {
            '': {
                controllerUrl: "./controller/tmp2.js",
                templateUrl: 'tmp2.html'
            }
        }
    });
    //编辑文章
    avalon.state('edi', {
        url: '/edi',
        controller: "root",
        views: {
            '': {
                controllerUrl: "./controller/edi.js",
                templateUrl: 'tpl/edi.html'
            }
        }
    });
    //登录
    avalon.state('login', {
        url: '/login',
        controller: "root",
        views: {
            '': {
                controllerUrl: "./controller/login.js",
                templateUrl: 'tpl/login.html'
            }
        }
    });
    //登出
    avalon.state('exit', {
        url: '/exit',
        controller: "root",
        views: {
            '': {
                controllerUrl: "./controller/exit.js",
                templateUrl: 'tpl/exit.html'
            }
        }
    });
    //文章列表
    avalon.state('artList', {
        url: '/article/category/:type',
        controller: "root",
        views: {
            '': {
                controllerUrl: "./controller/artList.js",
                templateUrl: 'tpl/artList.html'
            }
        },
        // abstract: true,
        onEnter: function() {
         //   console.log(this.params )

        },
        onIgnoreChange:function(){

        }
    });
    //文章列表分页
    avalon.state('artListPage', {
        url: '/article/category/:type/:page',
        controller: "root",
        views: {
            '': {
                controllerUrl: "./controller/artList.js",
                templateUrl: 'tpl/artList.html'
            }
        },
        // abstract: true,
        onEnter: function() {
            console.log(this.params )

        }
    });
    //文章
    avalon.state('art', {
        url: '/article/details/:id',
        controller: "root",
        views: {
            '': {
                controllerUrl: "./controller/art.js",
                templateUrl: 'tpl/art.html'
            }
        }

    });


    //启动路由
    avalon.history.start({

    });
    //go!!!!!!!!!
    avalon.scan()
});
