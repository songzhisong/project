;(function(){
	
$("#top").load("http://localhost/test/szj/kjt/public/public.html .bTop");
$("header").load("http://localhost/test/szj/kjt/public/public.html .tou");
$("nav").load("http://localhost/test/szj/kjt/public/public.html .daohang");
$("#footer").load("http://localhost/test/szj/kjt/public/public.html .footer");

//	通知栏
		function notice(){
			$(".top-l").find("span").animate({
				left:-100	
			},20000).queue(function(next){
	            $(".top-l").find("span").css({
	            	left:330
	            })
	            next();
	        })
		}
		setInterval(function(){
			notice()
		},300)
//	放大镜
		class Magnifier{
			constructor(){
				
				this.sBox = document.querySelector(".s_box");
				this.bBox = document.querySelector(".b_box");
				this.bImg = this.bBox.children[0];
				
				this.addEvent();
			}
			addEvent(){
				var that = this;
				this.sBox.onmouseenter = function(){
					that.show()
				}
				this.sBox.onmouseleave = function(){
					that.hide()	
				}
				this.sBox.onmousemove = function(eve){
					var e = eve || window.event
					that.move(e);
				}
			}
			show(){
				this.bBox.style.display = "block";
				
				if(!this.span){
					this.span = document.createElement("span");
					var w = this.bBox.offsetWidth / this.bImg.offsetWidth * this.sBox.offsetWidth;
					var h = this.bBox.offsetHeight / this.bImg.offsetHeight * this.sBox.offsetHeight;
					
					this.span.style.cssText = `width:${w}px;height:${h}px;background:rgba(200,200,200,0.2);position:absolute;left:0;top:0;`;
					this.sBox.appendChild(this.span);
				}
				
				this.span.style.display = "block";
			}
			hide(){
				this.span.style.display = "none";
				this.bBox.style.display = "none";
			}
			move(e){
				var l = e.pageX - this.sBox.offsetLeft - this.span.offsetWidth/2;
				var t = e.pageY - this.sBox.offsetTop - this.span.offsetHeight/2;
				
				if(l < 0) l=0;
				if(t < 0) t=0;
				if(l > this.sBox.offsetWidth - this.span.offsetWidth){
					l = this.sBox.offsetWidth - this.span.offsetWidth
				}
				if(t > this.sBox.offsetHeight - this.span.offsetHeight){
					t = this.sBox.offsetHeight - this.span.offsetHeight
				}
				this.span.style.left = l + "px";
				this.span.style.top = t + "px";
				
				var x = l / (this.sBox.offsetWidth - this.span.offsetWidth);
				var y = t / (this.sBox.offsetHeight - this.span.offsetHeight);
				
				this.bImg.style.left = -x * (this.bImg.offsetWidth - this.bBox.offsetWidth) + "px";
				this.bImg.style.top = -y * (this.bImg.offsetHeight - this.bBox.offsetHeight) + "px";
			}
		}	
			new Magnifier;
//	购物车的数值		
		class Num{
			constructor(){
				this.url = "http://localhost/test/szj/kjt/data/goods.json";
				
				this.load();				
				this.display();		
				this.addEvent();
				
			}
			load(){
				var that = this;
				ajaxGet(this.url,function(res){
//					console.log(res)
					that.res = JSON.parse(res);
					that.getCookie();
				});
			}
			addEvent(){
				var that = this;
				$(".btn1").on("click",function(){
//					console.log($(this));
					that.changeCookie();
				});
			}
			getCookie(){
				this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
				this.display();
			}
			display(){
				var sum = 0;
				for(var i in this.goods){
					sum += this.goods[i].num;
				}
				$(".num").html(sum);
			}
			changeCookie(callback){
				console.log(this.goods);
//				var i = 0;
//				this.goods.some((val,index)=>{
//					i = index;
//					return val.id == this.id;
//				})
//				callback(i);
//				setCookie("goods",JSON.stringify(this.goods));
			}
		}
		
		new Num;
//	总金额
		class Cash{
			constructor(){
				this.s = $("s");
				console.log(this.s.html());
				this.reduce = $("#left");
				this.plus = $("#right");
				this.price = $(".money u");
				this.btn1 = $(".btn1");
				this.num = parseFloat(this.s.html());
				this.sum = parseFloat($(".main-p-n").html().split("￥")[1]);
//				console.log(this.price);
				this.price[0].innerHTML = "￥"+this.sum*this.num;
				
				this.addEvent();
			}
			addEvent(){
				var that = this;
				this.reduce.on("click",function(){
					that.judgeLeft();
				});
				this.plus.on("click",function(){
					that.judgeRight();
				});
			}
			judgeLeft(){
				if(this.num <= 1){
//					console.log("不能再减少了");
					this.price[0].innerHTML = "￥"+this.sum*this.num;
				}else{
					this.num--;
					this.s.html(this.num);
					this.price[0].innerHTML = "￥"+this.sum*this.num;	
				}
			}
			judgeRight(){
				this.num++;
				this.s.html(this.num);
				this.price[0].innerHTML = "￥"+this.sum*this.num;	

			}
		}
		new Cash();
		
})();