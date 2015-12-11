/**
 * Created by Administrator on 2015/12/5.
 */
$(function(){
    //console.log($(window).width());  //980 改成 320
    var viewWidth = $(window).width();
    var viewHeight = $(window).height();
    var desWidth = 640;
    var touchstart = 'touchstart';
    var touchmove = 'touchmove';
    var touchend = 'touchend';
    var id=0;//将要播放的音乐ID
    var index=0;//音乐列表索引

    //列表页
    var $main = $('#main');
    var $listContent = $("#listContent");
    var $listContentUl = $('#listContentUl');
    var $listTitle = $('#listTitle');
    var $listAudio=$("#list_audio");
    var $listAudioImg=$("#listAudioImg");//头像图片
    var $listAudioText=$("#list_audioText");//文字
    var $listAudioBtn=$("#list_audioBtn");//按钮

    //详情页
    var $musicDetails=$("#musicDetails");
    var $musicTitle=$("#details_title");
    var $detailsName=$("#details_name"); //详情页头部文字
    var $detailsAudio=$("#detailsAudio");
    var $detailsAudioProUp=$("#detailsAudioProUp"); //进度条
    var $detailsAudioProBar=$("#detailsAudioProBar");//进度条滑柄
    var $detailsNowTime=$("#detailsNowTime");
    var $detailsAllTime=$("#detailsAllTime");
    var $detailsPlay=$("#detailsPlay");
    var $detailsPrev=$("#detailsPrev");
    var $detailsNext=$("#detailsNext");
    //播放标签
    var oAudio=$("#audio1").get(0);//通过原生来获取

    //歌词
    var $detailsLyric=$("#details_lyric");
    var $detailsLyricUl=$("#detailsLyricUl");
    var $li=null;//歌词li
    //留言
    var $detailsMessage=$("#detailsMessage");
    var $detailsMessageTa=$("#detailsMessageTa");
    var $detailsMessageBtn=$("#detailsMessageBtn");
    var $detailsMessageUl=$("#detailsMessageUl");
    var $detailsBtn=$("#detailsBtn");
    //加载动画
    var $loading=$("#loading");
    var $loadingLi=null;//音乐列表尾部的时候加载提示


    function init(){   //整个项目的初始化
        loadingFn();
        device();
        musicList.init();
        musicDetails.init();
        musicAudio.init();
    }
    function loadingFn(){//loading效果
        var arr = ['bg.jpg','detailsBg.jpg','details_pause.png','details_play.png','details_next.png','details_prev.png','list_audioBg.png','miaov.jpg'];
        var iNum=0;
        $.each(arr,function(i,img){
            var objImg=new Image();
            objImg.src='img/'+img;
            objImg.onload=function(){
                iNum++;
                console.log(iNum);
                if(iNum==arr.length){
                    $loading.animate({opacity:0},1000,function(){
                      $(this).remove();
                    });
                }
            };
            objImg.onerror=function(){
                $loading.animate({opacity:0},1000,function(){
                    $(this).remove();
                });
            }
        })
    }
    //兼容PC和移动端
    function device(){
        var isMobile = /Mobile/i.test(navigator.userAgent);
        if(viewWidth > desWidth){
            $main.css('width','640px');
        }
        if(!isMobile){
            touchstart = 'mousedown';
            touchmove = 'mousemove';
            touchend = 'mouseup';
        }
        $(window).resize(function(){
            viewWidth = $(window).width();
            viewHeight = $(window).height();
            musicDetails.sildeDown();
        });
    }
    //音乐列表页操作
    var musicList = (function(){
        var bbsUrl = 'http://blog.csdn.net/xiaomogg';
        var listUrl = 'musicList.php';
        var downY=null; //手指摁下的Y坐标
        var prevY=0;//前一次坐标
        var downT=null;//手指摁下的时候当时列表距离顶部的距离
        var parentH = $listContent.height();
        var childH = $listContentUl.height();
        var onoff1 = true;
        var onoff2 = true;
        var onoff3=true;//判断单点和滑屏的开关
        var timer = null;
        var speed = 0;
        var page=0;//；懒加载分页
        var hasData=false;//懒加载的时候判断是否有值

        function init(){  //初始
            data();
            bind();
            moveScroll();
        }

        function data(){  //数据
            $.ajax({
                url : listUrl,
                type : 'GET',
                dataType : 'json',
                success : function(data){
                    $.each(data,function(i,obj){
                        var $li = '<li musicId="'+(obj.id)+'"><h3 class="title">'+(obj.musicName)+'</h3><p class="name">'+(obj.name)+'</p></li>';
                        $listContentUl.append($li);
                    });
                    childH = $listContentUl.height();
                }
            });
        }

        function bind(){   //事件
            $listTitle.on(touchstart,function(){
                window.location = bbsUrl;
            });
           // $listContentUl.delegate("li",touchend,function(){  //鼠标放开的时候判断是点击，就执行
            $listContentUl.on(touchend,"li",function(){
                if(onoff3) {
                    $(this).attr("class","active").siblings().removeClass("active");
                    id=$(this).attr("musicid");
                    musicAudio.loadMusic(id);
                    index=$(this).index();//获取当前点击的索引
                }

            });
            $listAudio.on(touchstart,function(){
                if(id){ //当id不为0的时候可以点击
                    musicDetails.sildeUp();
                }

            })

        }

        function moveScroll(){   //滑动列表
            $(document).on(touchmove,function(ev){
                ev.preventDefault();
            });
            $listContentUl.on(touchstart,function(ev){
                //ev.pageX
                //touch.pageX
                //ev.originalEvent -> JQ的event转成JS的event
                onoff3 = true;
                if(parentH > childH){return false;}
                var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
                var This = this;
                downY = touch.pageY;
                prevY = touch.pageY;
                downT = $(this).position().top;
                onoff1 = true;
                onoff2 = true;

                clearInterval(timer);
                $(document).on(touchmove+'.move',function(ev){
                    onoff3= false;
                    var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
                    var iTop = $(This).position().top;

                    speed = touch.pageY - prevY;
                    prevY = touch.pageY;

                    if(iTop >= 0){   //头
                        if(onoff1){
                            onoff1 = false;
                            downY = touch.pageY;
                        }
                        $(This).css('transform','translate3d(0,'+(touch.pageY - downY)/3+'px,0)');
                    }
                    else if(iTop <= parentH - childH){  //尾
                        if(onoff2){
                            onoff2 = false;
                            downY = touch.pageY;
                            //到尾部的时候添加加载
                           // var tips=hasData=true?"loadiong":"nodata";
                            $loadingLi=$('<li style="text-align: center;color:#fff;line-height:60px;">loading..</li>');
                            $(This).append($loadingLi);
                        }
                        $(This).css('transform','translate3d(0,'+((touch.pageY - downY)/3 + (parentH - childH))+'px,0)');
                    }
                    else{
                        $(This).css('transform','translate3d(0,'+(touch.pageY - downY + downT)+'px,0)');
                    }

                });
                $(document).on(touchend+'.move',function(){
                    $(this).off('.move');
                    if($loadingLi){ //清楚底部loading的li
                        $loadingLi.remove();
                        $loadingLi=null;
                        $.ajax({
                            url:"pageMusic.php",
                            type:"get",
                            dataType:"json",
                            data:{page:page},
                            success:function(data){
                              page++;
                                if(!data.data){
                                    hasData=true;
                                    $.each(data,function(i,obj){
                                        var $li = '<li musicId="'+(obj.id)+'"><h3 class="title">'+(obj.musicName)+'</h3><p class="name">'+(obj.name)+'</p></li>';
                                        $listContentUl.append($li);
                                    });
                                    childH = $listContentUl.height();
                                }
                                else{
                                    //hasData=false;
                                    return false;
                                }

                            },
                            error:function(){
                               // alert("error");
                            }
                        })
                    }
                    //console.log(speed);
                    if(!onoff3){
                        clearInterval(timer);
                        timer = setInterval(function(){
                            var iTop = $(This).position().top;
                            if(Math.abs(speed) <= 1 || iTop > 50 || iTop < parentH - childH - 50){
                                clearInterval(timer);
                                if(iTop >= 0){
                                    $(This).css('transition','.2s');
                                    $(This).css('transform','translate3d(0,0,0)');
                                }
                                else if(iTop <= parentH - childH){
                                    $(This).css('transition','.2s');
                                    $(This).css('transform','translate3d(0,'+(parentH - childH)+'px,0)');
                                }
                            }
                            else{
                                speed *= 0.9;
                                $(This).css('transform','translate3d(0,'+(iTop + speed)+'px,0)');
                            }

                        },13);
                    }


                });
                return false;
            });
            $listContentUl.on('transitonend webkitTransitionEnd',function(){
                $(this).css('transition','');
            });
        }
        function show(sName,sMusicName,sImg){  //显示
            $listAudioImg.attr("src","img/"+sImg);
            $listAudioText.find("h3").html(sMusicName);
            $listAudioText.find("p").html(sName);
            $listAudioBtn.show();
        }
        return {
            init : init,
            show:show
        };

    })();
    //音乐详情页操作
    var musicDetails=(function(){
        var reg=/\[[^[]+/g;
        var arr=[];
        var liH;//单行歌词的高度
        var downX=0;//手指摁下的坐标
        var rang=20;//手指滑动的最小距离
        var timer = null;//循环切换留言定时器
        function init(){
            $musicDetails.css("transform","translate3d(0,"+(viewHeight)+"px,0)");
            $detailsMessage.css("transform","translate3d("+(viewWidth)+"px,0,0)");//把留言板网游移动100%；
            bind();
        }
        function sildeUp(){//向上展开
            $musicDetails.css("transition",".5s");
            $musicDetails.css("transform","translate3d(0,0,0)");
        }
        function sildeDown(){  //向下收缩
            $musicDetails.css("transform","translate3d(0,"+(viewHeight)+"px,0)");
            $musicDetails.one("transitionend webKitTransitionEnd",function(){ //收缩完毕的时候初始化留言和歌词模板
                $detailsLyric.add($detailsAudio).css('transform','translate3d(0,0,0)');
                $detailsMessage.css('transform','translate3d('+(viewWidth)+'px,0,0)');
                $detailsBtn.find("li").eq(1).removeClass("active").siblings().addClass("active");//给切换tab切换class
            })
        }
        function bind(){
            $musicTitle.on("click",function(){
                sildeDown();
            });
            $musicDetails.on(touchstart,function(ev){  //留言和列表页面的切换
                var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
                downX = touch.pageX;
                $(document).on(touchend+'.move',function(ev){
                    $(this).off('.move');
                    var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
                    if( touch.pageX - downX < -rang){   //←
                        $detailsLyric.add($detailsAudio).css('transform','translate3d('+(-viewWidth)+'px,0,0)');
                        $detailsMessage.css('transform','translate3d(0,0,0)');
                        $detailsBtn.find("li").eq(0).removeClass("active").siblings().addClass("active");//给切换tab切换class
                        loadMessage();
                        clearInterval(timer);//清楚留言切换的定时器
                        timer=setInterval(scrollMessage,3000);
                    }
                    else if( touch.pageX - downX > rang){   //→
                        clearInterval(timer);//清楚留言切换的定时器
                        $detailsLyric.add($detailsAudio).css('transform','translate3d(0,0,0)');
                        $detailsMessage.css('transform','translate3d('+(viewWidth)+'px,0,0)');
                        $detailsBtn.find("li").eq(1).removeClass("active").siblings().addClass("active");//给切换tab切换class
                    }
                });

            });
            $detailsMessageBtn.on(touchstart,function(){
                addMessage();
            });
        }
        function loadMessage(){ //载入留言
            $detailsMessageUl.empty();//清空留言
            $.ajax({
                url:'loadMessage.php',
                type:"GET",
                dataType:"json",
                data : { mid : id },
                success:function(data){
                    console.log(data);
                    $.each(data,function(){
                        $.each(data,function(i,obj){
                            var $li = $('<li>'+obj.text+'</li>');
                            $detailsMessageUl.prepend($li);
                        });
                    });
                },error:function(status){
                    console.log(status)
                }
            })
        }
        function addMessage(){ //添加留言
            var value=$detailsMessageTa.val();
            $detailsMessageTa.val("");
            $.ajax({
                url:"addMessage.php",
                type:"POST",
                dataType:"json",
                data:{mid:id,text:value},
                success:function(data){
                    if(data.code){
                        var $li = $('<li>'+data.message+'</li>');
                        $detailsMessageUl.prepend($li);
                    }

                },
                error:function(){
                    alert("error");
                }

            })
        }
        function scrollMessage(){//滚动留言
            var $last=$detailsMessageUl.find("li").last();
            $detailsMessageUl.prepend($last);
        }
        function show(sName,sMusicName,sLyric){
            $detailsName.html(sMusicName+'<span>'+sName+'</span>');
            $detailsLyricUl.empty().css('transform','translate3d(0,0,0)');//恢复初始状态
            arr=sLyric.match(reg);
            for(var i=0;i<arr.length;i++){ //把歌词变成二维数组
                arr[i]=[formatTime(arr[i].substring(0,10)),arr[i].substring(10).trim()];
            }
           // console.log(arr);
            for(var i=0;i<arr.length;i++){
                $li=$("<li>"+arr[i][1]+"</li>");
                $detailsLyricUl.append($li);

            }
            $li=$detailsLyricUl.find("li");
            $li.first().addClass("active");
            liH=$li.first().outerHeight(true);

        }
        function formatTime(num){    //把十分表的时间格式化为秒
            num=num.substring(1,num.length-1);
            var arr=num.split(":");
            return(parseFloat(arr[0]*60)+parseFloat(arr[1])).toFixed(2);

        }
        function scrollLyric(ct){ //滚动歌词
            //console.log(ct);
            for(var i=0;i<arr.length;i++){
                if(i!=arr.length - 1&&ct>arr[i][0]&&arr[i+1][0]){
                    $li.eq(i).addClass("active").siblings().removeClass("active");
                    // console.log(i);
                    if(i>3){
                        $detailsLyricUl.css("transform","translate3d(0,"+((-liH)*(i-3))+"px,0)")
                    }
                    else{  //往回拖拽滚动条手柄的时候
                        $detailsLyricUl.css('transform','translate3d(0,0,0)');
                    }
                }
                else if(i==arr.length-1&&ct>arr[i][0]){//最后一条歌词
                    $li.eq(i).addClass("active").siblings().removeClass("active");
                    $detailsLyricUl.css("transform","translate3d(0,"+((-liH)*(i-3))+"px,0)")
                }
            }
        }

        return {
            init:init,
            sildeUp:sildeUp,
            sildeDown:sildeDown,
            show:show,
            scrollLyric:scrollLyric
        }
    })();
    //音乐播放器操作
    var musicAudio=(function(){
        var onoff=true;//切换播放和暂停的开关
        var timer;//进度条定时器
        var disX=null;//进度条手柄X
        var parentW=$detailsAudioProBar.parent().width();
        var scale=0;
        function init(){
            bind();
        }
        function loadMusic(id){ //载入音乐
            $.ajax({
                url:"musicAudio.php",
                type:"get",
                dataType:"json",
                async:false,//修复苹果safari不能播放的bug
                data:{id:id},
                success:function(data){
                    show(data);
                },
                error:function(){
                    alert("error")
                }

            })

        }
        function show(obj){  //显示
            var sName=obj.name;
            var sMusicName=obj.musicName;
            var sLyric=obj.lyric;
            var sAudio=obj.audio;
            var sImg=obj.img;
            musicList.show(sName,sMusicName,sImg);
            musicDetails.show(sName,sMusicName,sLyric);
            oAudio.src='img/'+sAudio;
            play(); //修复苹果Safari不能播放bug
            $(oAudio).one("canplaythrough",function(){  //加载完毕
                //play();
                $detailsAllTime.html( formtTime(oAudio.duration));
            });
            $(oAudio).one("ended",function(){  //播放完毕
                next();
            })
        }
        function play(){ //播放
            onoff=false;
            $listAudioImg.addClass("move");
            $listAudioBtn.css('backgroundImage',"url(img/list_audioPause.png)");
            $detailsPlay.css('backgroundImage',"url(img/details_pause.png)");
            oAudio.play();//原生的oAudio节点获取
            playing();//播放中
            clearInterval(timer);
            timer=setInterval(playing,1000);
        }
        function pause(){//暂停
            onoff=true;
            $listAudioImg.removeClass("move");
            $listAudioBtn.css('backgroundImage',"url(img/list_audioPlay.png)");
            $detailsPlay.css('backgroundImage',"url(img/details_Play.png)");
            oAudio.pause();//原生的oAudio节点获取
            clearInterval(timer);
        }
        function formtTime(num){//格式化时间
            num=parseInt(num);
            var iM=Math.floor(num%3600/60);//分钟
            var iS=Math.floor(num%60);//秒钟
            return toZero(iM)+":"+toZero(iS);
        }
        function toZero(num){//补零
            if(num<10){
                return "0"+num;
            }
            else{
                return ""+num;
            }
        }
        function playing(){  //播放进行中
            $detailsNowTime.html(formtTime(oAudio.currentTime));
            scale=oAudio.currentTime/oAudio.duration;//获取时间比例
            $detailsAudioProUp.css("width",scale*100+"%");
            $detailsAudioProBar.css("left",scale*100+"%");
            musicDetails.scrollLyric(oAudio.currentTime);

        }
        function bind(){//事件
            $listAudioBtn.add($detailsPlay).on(touchstart,function(){
                if(onoff){
                    play()
                }
                else{
                    pause();
                }
                return false;//阻止冒泡
            });
            //拖拽进度条手柄
            $detailsAudioProBar.on(touchstart,function(ev){
                var touch=ev.originalEvent.changeTouches?ev.originalEvent.changeTouches[0]:ev;
                var This=$(this);
                disX=touch.pageX-$(this).position().left;
                $(document).on(touchmove+".move",function(ev){
                    var touch=ev.originalEvent.changeTouches?ev.originalEvent.changeTouches[0]:ev;
                    var L=touch.pageX-disX;
                    if(L<=0){
                        L=0;
                    }
                    else if(L>=parentW){
                        L=parentW;
                    }
                    This.css("left",L+"px");
                    scale=L/parentW;
                    clearInterval(timer);
                });
                $(document).on(touchend+".move",function(){
                    $(this).off(".move");
                    oAudio.currentTime=scale*oAudio.duration;
                    playing();//播放中
                    clearInterval(timer);
                    timer=setInterval(playing,1000);
                });
            });
            //播放操作上一首以及下一首
            $detailsPrev.on(touchstart,function(){
                prev();
            });
            $detailsNext.on(touchstart,function(){
                next();
            })
        }
        function next(){//下一首歌
            var $li=$listContent.find("li");
            index=index==$li.length-1?0:index+1; //循环播放
            id=$li.eq(index).attr("musicId");
            $li.eq(index).addClass("active").siblings().removeClass("active");
            loadMusic(id)
        }
        function prev(){//上一首歌
            var $li=$listContent.find("li");
            index=index==0?index-1:index-1; //循环播放
            id=$li.eq(index).attr("musicId");
            $li.eq(index).addClass("active").siblings().removeClass("active");
            loadMusic(id)
        }

        return {
            init:init,
            loadMusic:loadMusic
        }
    })();
    init();

});
