/*header start*/
    ( function(){
        var $buyA = $('#header .h_wrap .h_w_right .h_r_buy a');
        var $hide = $('#header .h_wrap .h_w_right .hide');
        $buyA.on( 'mouseenter mouseleave',function(){
            $(this).toggleClass('hover');
            $hide.stop().toggle();
        } )
    }() );
/*end header*/

/*nav start*/
    // nav_variety
    ( function(){
        var $oA = $('#nav .n_content .variety li a.down');
        var $hide = $('#nav .n_hide');
        var $ul = $('#nav .n_hide ul');

        $oA.hover( function(){
            $(this).addClass('hover');
            $hide.stop().slideDown();
            $ul.eq( $oA.index($(this)) ).stop().show().siblings().hide();//重点
        },function(){
            $(this).removeClass('hover');
            $hide.stop().slideUp();
        } );
        $hide.hover( function(){
            $(this).stop().toggle();
        });
    }() );

    // nav_search
    ( function(){
        var $box_search = $('#nav .n_content .search');
        var $box_inp = $('#nav .n_content .search .inp');
        var $btn = $('#nav .n_content .search .btn');
        var $input = $('#nav .n_content .search .inp input');
        var $span = $('#nav .n_content .search .inp span');
        var $hide = $('#nav .n_content .search .hide');
        $box_search.hover( function(){
            $box_inp.toggleClass('hover');
            $btn.toggleClass('hover');
        } );
        $input.on('focus blur',function(){
            $box_inp.toggleClass('focus');
            $btn.toggleClass('focus');
            $span.stop().fadeToggle();
            $hide.stop().slideToggle(300);
        } );
    }() );
/*end nav*/

/*banner start*/
    //banner main
    ( function(){
        var $banner = $('#banner');
        var $pic = $('#banner .b_main .b_m_pic li');
        var $tab = $('#banner .b_main .b_m_tab li');
        var $btn = $('#banner .b_main span');
        var length = $pic.length;
        var num = 0;
        var timer;
        var oTime = new Date();
        $pic.eq(num).show();
        $tab.eq(num).addClass('on');

        //tab点击事件
        $tab.click( function(){
            var nowTime = new Date();
            if(nowTime-oTime>800&&num != $(this).index()){
            //nowTime-newTime>800两次点击间隔必须800ms以上
            //num != $(this).index()自己点自己不能触发
                banner( function(){ num = $(this).index();}.bind(this) );
            }//if结束
            oTime = nowTime;//更新newTime
        } );//click结束

        //btn左右点击事件
        $btn.click( function(){
            var nowTime = new Date();
            if(nowTime-oTime>800){//两次点击间隔必须800ms以上
                var i = $(this).index();
                banner( function(){
                    if (i) {num++; num %= length;
                    }else{if(num<=0){num=length;}
                          num--;
                    }
                } );
            }//if结束
            oTime = nowTime;//更新newTime
        } );//click结束

        //轮播封装函数
        function banner( fn ){
            $pic.eq(num).stop().fadeOut(800);//清除队列
            $tab.eq(num).removeClass('on');
            fn();
            $pic.eq(num).stop().fadeIn(800);//清除队列
            $tab.eq(num).addClass('on');
        }

        auto();//自动轮播自执行
        function auto() {
            timer = setInterval( function(){
                  banner( function(){ num++; num %= length;} );
            },3000 );
        }
        $banner.hover( function(){clearInterval(timer);}, auto);//鼠标划入banner自动轮播停止，鼠标划出banner自动轮播继续
    }() );

    //banner nav
    ( function(){
        var $li = $('#banner .b_nav >  ul > li');
        var $hover = $('#banner .b_nav .hover');

        $hover.each( function(){//规定hover的盒子的宽度和列数。排列方式：先列后行
            var $h_li = $(this).find('li');//这里只能用find(),用直接获取对象的方法不行
            var length = $h_li.length;//16
            var width = $h_li.width();//248px,带单位
            var height = $h_li.height();//80px,带单位
            var cols = Math.ceil(length/6);//向上取整，规定列数
            $(this).width(cols*width);
            $h_li.each( function(i){
                $(this).css({
                    left:Math.floor(i/6)*width,//向下取整
                    top:Math.floor(i%6)*height//向下取整
                });
            } );

        } );
        $li.hover( function(){//hover事件
            $(this).find('div').stop().toggle();
        } );
    } ());
/*end banner*/

/*star start*/
    ( function(){
        var $tab = $('#star .tab span');
        var $ul = $('#star ul');
        var index = false;//0
        var timer;

        //点击tab，左右轮播运动
        $tab.click( function(){
            clearInterval(timer);//每次点击之前，清除定时器
            var i = $(this).index();
            if(!!i!=index) {//两次点击之间的间隔必须1000ms以上
                $(this).removeClass('color').siblings().addClass('color');
                $ul.stop().animate( {left:-i*1226},500);
                index = !!i;//index为true或false。此处作用:更新index
            }
            auto();//每次点击完后，自动运行自动轮播
        } );
    //避免动画重复运行
    //方法一：加上时间控制点击间隔，方法二：在animate前面加上stop()
    //
    //i为0时,!!i为false
    //i为1时,!!i为true

        //每隔5000ms自动轮播一次
        auto();
        function auto() {
            timer = setInterval( function(){
                index = !index;//让index为0或者1
                var x = index - 0;
                //减法运算
                //true-0相当于1-0
                //false-0相当于0-0
                $tab.eq(x).removeClass('color').siblings().addClass('color');
                $ul.stop().animate( {left:-x*1226},500);
            },5000);
        }
    }() );
/*end star*/

/*main start*/
    // device
    ( function(){
        var $d_right = $('#m_device .down .d_right .d_r_con');
        var $d_li = $('#m_device .down .d_right .d_r_con ul li');
        var $d_aTop = $('#m_device .top .t_right a');
        $d_right.eq(0).show().siblings().hide();
        $d_aTop.eq(0).addClass('hover');
        $d_li.hover( function(){
            $(this).find('.comment').stop().animate( {bottom:0},200);
        },function(){
            $(this).find('.comment').stop().animate( {bottom:-70},200);
        } );
        $d_aTop.mouseenter( function(){
            $(this).addClass('hover').siblings().removeClass('hover');
            $d_right.eq( $d_aTop.index($(this)) ).show().siblings().hide();
        } );
    }() );//device结束

    // smart
    ( function(){
        var $s_right = $('#m_smart .down .d_right .d_r_con');
        var $s_li = $('#m_smart .down .d_right .d_r_con ul li');
        var $s_aTop = $('#m_smart .top .t_right a');
        $s_right.eq(0).show().siblings().hide();
        $s_aTop.eq(0).addClass('hover');
        $s_li.hover( function(){
            $(this).find('.comment').stop().animate( {bottom:0},200);
        },function(){
            $(this).find('.comment').stop().animate( {bottom:-70},200);
        } );
        $s_aTop.mouseenter( function(){
            $(this).addClass('hover').siblings().removeClass('hover');
            $s_right.eq( $s_aTop.index($(this)) ).show().siblings().hide();
        } );
    }() );//smart结束

    // with
    ( function(){
        var $w_right = $('#m_with .down .d_right .d_r_con');
        var $w_li = $('#m_with .down .d_right .d_r_con ul li');
        var $w_aTop = $('#m_with .top .t_right a');
        $w_right.eq(0).show().siblings().hide();
        $w_aTop.eq(0).addClass('hover');
        $w_li.hover( function(){
            $(this).find('.comment').stop().animate( {bottom:0},200);
        },function(){
            $(this).find('.comment').stop().animate( {bottom:-70},200);
        } );
        $w_aTop.mouseenter( function(){
            $(this).addClass('hover').siblings().removeClass('hover');
            $w_right.eq( $w_aTop.index($(this)) ).show().siblings().hide();
        } );
    }() );//with结束

    // match
    ( function(){
        var $m_right = $('#m_match .down .d_right .d_r_con');
        var $m_li = $('#m_match .down .d_right .d_r_con ul li');
        var $m_aTop = $('#m_match .top .t_right a');
        $m_right.eq(0).show().siblings().hide();
        $m_aTop.eq(0).addClass('hover');
        $m_li.hover( function(){
            $(this).find('.comment').stop().animate( {bottom:0},200);
        },function(){
            $(this).find('.comment').stop().animate( {bottom:-70},200);
        } );
        $m_aTop.mouseenter( function(){
            $(this).addClass('hover').siblings().removeClass('hover');
            $m_right.eq( $m_aTop.index($(this)) ).show().siblings().hide();
        } );
    }() );//match结束

    // around
    ( function(){
        var $a_right = $('#m_around .down .d_right .d_r_con');
        var $a_li = $('#m_around .down .d_right .d_r_con ul li');
        var $a_aTop = $('#m_around .top .t_right a');
        $a_right.eq(0).show().siblings().hide();
        $a_aTop.eq(0).addClass('hover');
        $a_li.hover( function(){
            $(this).find('.comment').stop().animate( {bottom:0},200);
        },function(){
            $(this).find('.comment').stop().animate( {bottom:-70},200);
        } );
        $a_aTop.mouseenter( function(){
            $(this).addClass('hover').siblings().removeClass('hover');
            $a_right.eq( $a_aTop.index($(this)) ).show().siblings().hide();
        } );
    }() );//around结束

    // forYou
    ( function(){
        var $f_tab = $('#m_forYou .tab span');//2个
        var $f_box = $('#m_forYou .box');//1个
        var $f_ul = $('#m_forYou .box ul');//4个
        var f_length = $f_ul.length;//4
        var f_num = 0;
        var timer;

        //点击tab，左右轮播运动
        $f_tab.click( function(){
            clearInterval(timer);//点击开始，结束自动轮播
            var f_i = $(this).index();//0或1
            if(f_i==1) {//右点击
                f_num++;
                if( f_num>=(f_length-1) ){
                    f_num = f_length-1;
                    $(this).removeClass('color').siblings().addClass('color');
                }
                else{
                    $f_tab.eq(0).addClass('color');
                }
                $f_box.stop().animate( {left:-f_num*1226+'px'},500);
            }else{//左点击
                f_num--;
                if(f_num<=0) {
                    f_num = 0;
                    $(this).removeClass('color').siblings().addClass('color');
                }else{
                    $f_tab.eq(1).addClass('color');
                }
                $f_box.stop().animate( {left:-f_num*1226+'px'},500);
            }
            auto();//点击结束，开启自动轮播
        } );//点击tab结束

        $f_box.hover( function(){clearInterval(timer);},auto);
        //鼠标划入:停止自动轮播，鼠标划出:继续轮播

        //每6000ms进行一次自动轮播
        // auto();
        function auto() {
            timer = setInterval( function(){
                f_num++;
                f_num %= f_length;
                if(f_num==0){
                    $f_tab.eq(0).removeClass('color').siblings().addClass('color');
                }
                else if( f_num==f_length-1 ) {
                    $f_tab.eq(1).removeClass('color').siblings().addClass('color');
                }else{
                    $f_tab.addClass('color');
                };
                $f_box.stop().animate({left:-f_num*1226+'px'},500);

            },6000);
        }//auto函数结束
    }() );//forYou结束

    // hot
    // hot结束

    //contents
    ( function (){
        var $bBox = $('#m_contents .bWrap .bBox');
        var $more = $('#m_contents .sWrap .sBox .more');
        var oTime = new Date();

        $bBox.hover( function(){
            $(this).find('.btn').stop().show();
        },function(){
            $(this).find('.btn').stop().hide();
        } ).each( function(){
            $(this).addClass('shadow');//加shadow
            var $tabLi = $(this).find('.tab ul li');//遍历每一个$bBox下面的$tabLi
            var $btnA = $(this).find('.btn a');//遍历每一个$bBox下面的$tabLi
            // console.log($btnA);
            $tabLi.eq(0).addClass('on');//遍历每一个$bBox下面的$tabLi的第一个li
            $tabLi.click( function(){
                var index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $(this).parents('.tab').prev().animate( {
                    marginLeft:-index*286+'px'
                },500);//animate结束
            } );//$tabLi.click结束
            var num = 0;
            $btnA.click( function(){
                var nowTime = new Date();
                if (nowTime-oTime>500) {
                    var length = $(this).parent().next().find('li').length;
                    $(this).index()?num++:num--;
                    num = Math.min(num,length-1);
                    num = Math.max(num,0);
                    $(this).parents('.bBox').find('.tab ul li').eq(num).addClass('on').siblings().removeClass('on');
                    $(this).parents('.btn').next().animate( {
                        marginLeft:-num*286+'px'
                    },500);//animate结束
                    oTime = nowTime;
                    return false;//阻止默认事件
                }
            } ).each( function(){
                return false;
            } );//$btnA.click结束
        } );//$bBox.each()结束

        $more.each( function(){
            var Color = $(this).parents('.bBox').css('border-top-color');
            $(this).css( {
                borderColor:Color,
                color:Color
            } ).hover( function(){
                $(this).css( {
                    backgroundColor:Color,
                    color:'#fff'
                } );
            },function(){
                $(this).css( {
                    backgroundColor:'#fff',
                    color:Color
                } );
            });//$(this).css().hover()结束
        } );//$more.each结束
    } () );//contents结束

    //video
    ( function(){
        var $content = $('#m_video .content');
        var $li = $('#m_video .content ul li');
        var $img = $('#m_video .content ul li .img');
        var $cover = $('body .cover');


        var arr = [
            '<embed src="http://player.video.qiyi.com/c12b8110a2858e41edb994d47818c473/0/0/w_19rwh91g7t.swf-albumId=10814829109-tvId=10814829109-isPurchase=0-cnId=27" allowFullScreen="true" quality="high" width="880" height="550" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>',
            '<embed src="http://player.video.qiyi.com/8ecf2f40618781d75dcf072b8ef6bd61/0/0/w_19rv6670vl.swf-albumId=9350031709-tvId=9350031709-isPurchase=0-cnId=30" allowFullScreen="true" quality="high" width="880" height="550" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>',
            '<embed src="http://player.video.qiyi.com/38fb8c9586cee68ccf21b63637c235b7/0/0/w_19rr9rayih.swf-albumId=593402709-tvId=593402709-isPurchase=0-cnId=25" allowFullScreen="true" quality="high" width="880" height="550" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>',
            '<embed src="http://v.ifeng.com/include/exterior.swf?guid=f01d7eab-a5f5-4ba8-a859-550ea1dc4730&pageurl=http://www.ifeng.com&fromweb=other&AutoPlay=false" quality="high"  allowScriptAccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="880" height="550"></embed></object>'
        ];
        $li.hover( function(){
            $(this).addClass('shadow');
            $(this).find('.iconfont').addClass('hover');
        },function(){
            $(this).removeClass('shadow');
            $(this).find('.iconfont').removeClass('hover');
        } );//$li.hover结束

        $img.click( function(){
            var index = $li.index( $(this).parent() );
            var name  = $(this).next().find('a').html();
            $cover.show();
            $cover.append(//在遮罩层上面加上内容
                '<ul class="c_content"><li class="top"><span class="name">'
                + name +
                '</span><b>x</b></li><li class="video">'
                +arr[index]+
                '</li></ul>'
            );
            $cover.find('.c_content').css( {//在遮罩层上面内容从无到有
                'opacity':'0',
                'marginTop':-600+'px'
            } ).stop().animate( {
                'opacity':'1',
                'marginTop':-300+'px'
            },800 );
            return false;//阻止a的默认事件
        } );//$img.click结束
        $cover.on( 'click','b',function(){
            $(this).parents('.c_content').animate( {
                'marginTop':-600+'px'
            },200,function(){
                $cover.find('.c_content').remove();
                $cover.hide();
            } );
        } );//$cover.on结束
        //$cover.on( 'click','b',function(){} );
        //animate( {},300,function(){} );
    } () );//video结束
/*end main*/









