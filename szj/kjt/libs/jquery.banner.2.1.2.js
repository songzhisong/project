;(function($){
    "use strict";
    
    $.fn.banner = function(options){
        // console.log(this)
        var that = this;
        var ban = {};
        ban.list = options.list === false ? false : true;
        ban.autoPlay = options.autoPlay === false ? false : true;
        ban.delayTime = options.delayTime || 2000;
        ban.moveTime = options.moveTime || 300;
        
        if(options.index >= 0 && options.index <= options.items.length-1){
            ban.index = options.index;
        }else if(options.index > options.items.length-1){
            ban.index = options.items.length-1
        }else{
            ban.index = 0;
        }

        ban.iPrev = null;


        // 生成list（最下面的小圆点）
        ban.init = function(){
            if(!ban.list) return;
            this.ul = $("<ul>");
            var str = "";
            for(var i=0;i<options.items.length;i++){
                str += `<li></li>`
            }
            this.ul.html(str);
            that.append(this.ul);
            // 设置样式
            this.ul.css({
                width:"20%",
                lineHeight:"30px",
                display:"flex",
//              backgroundColor:"rgba(200,200,200,0.6)",
                position:"absolute",
                left:"47%",
                bottom:"5px",
                margin:0,
                padding:0,
                listStyle:"none",
                textAlign:"center",
//              alignItems:"center"
            }).children("li").css({
//              flex:1,
				opacity:".8",
                margin:"0 5px",
                height:"20px",
                width:"20px",
                lineHeight:"20px",
                border:"1px solid #fee2b1",
                backgroundColor:"#b19666",
                borderRadius:"50%",
//              varticalAlign:"20px";
            }).eq(ban.index).css({
                backgroundColor:"#ff6c49",
                border:"1px solid #000"
            })
            this.listAction()
        }
        // L2.小圆点的点击切换对应图片的功能
        ban.listAction = function(){
            var _this = this;
            this.ul.children("li").click(function(){

                if($(this).index() > _this.index){

                    _this.listMove(1,$(this).index())
                }
                if($(this).index() < _this.index){

                    _this.listMove(-1,$(this).index())
                }

                _this.index = $(this).index();

                _this.ul.children("li").css({
                    backgroundColor:"#b19666",
                    border:"1px solid #fee2b1"
                }).eq(_this.index).css({
                    backgroundColor:"#ff6c49",
                    border:"1px solid #000"
                })
            })
        }
        ban.listMove = function(type,iNow){
            options.items.eq(this.index).css({
                left:0
            }).stop().animate({
                left:-options.items.eq(0).width() * type
            },this.moveTime).end().eq(iNow).css({
                left:options.items.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime)
        }
        
        ban.btnActive = function(){
            // console.log(options.left)
            if(!(options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0)) return;

            var _this = this;

            // 绑定点击事件
            options.left.on("click",function(){
                if(_this.index == 0){
                    _this.index = options.items.length-1;
                    _this.iPrev = 0;
                }else{
                    _this.index--;
                    _this.iPrev = _this.index+1;
                }
                _this.btnMove(-1);
            })

            options.right.on("click",this.rightClick.bind(this));
        }
        ban.rightClick = function(){
            if(this.index == options.items.length-1){
                this.index = 0;
                this.iPrev = options.items.length-1;
            }else{
                this.index++;
                this.iPrev = this.index - 1;
            }
            this.btnMove(1);
        }
        ban.btnMove = function(type){
            options.items.eq(this.iPrev).css({
                left:0
            }).stop().animate({
                left:-options.items.eq(0).width() * type
            },this.moveTime).end().eq(this.index).css({
                left:options.items.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime)

            if(!this.list) return ;
            this.ul.children("li").css({
                backgroundColor:"#b19666",
                border:"1px solid #fee2b1"
            }).eq(this.index).css({
                backgroundColor:"#ff6c49",
                border:"1px solid #000"
            })
        }

        ban.autoAction = function(){
            var _this = this;
            if(!ban.autoPlay) return;
            this.t = setInterval(() => {
                this.rightClick()
            }, this.delayTime);

            that.hover(function(){
                clearInterval(_this.t)
            },function(){
                _this.t = setInterval(() => {
                    _this.rightClick()
                }, _this.delayTime);
            })
        }


        ban.init();
        ban.btnActive();
        ban.autoAction();
    }
})(jQuery);