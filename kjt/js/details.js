;(function(){
	
//$("#top").load("http://localhost/test/szj/kjt/public/public.html .bTop");
//$("header").load("http://localhost/test/szj/kjt/public/public.html .tou");
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
//	渲染页面+放大镜
		class Search{
			constructor() {
				this.msg = localStorage.getItem("loginUser");
				
				this.tu = $(".main-b-l");
				this.nm = $(".main-b-r h3");
				this.price = $(".main-p-n");
				this.total = $(".money u");
				this.url="http://localhost/test/szj/kjt/data/goods.json";
				
			    this.load();
			}
			load(){
				var result = decodeURIComponent(location.search)
				
				this.result = result.substring(1)
					var that=this;
					$.ajax({
						type:"get",
						url:this.url,
						success:function(res){
							that.res= res
//							that.getCookie()
							that.display()
						}
					})
			}
			display(){
				var str1="";
				var str2="";
				var str3="";
				var str4="";
				for(var i=0;i<this.res.length;i++){
	//				console.log(this.res)
					if(this.result == this.res[i].goodsId){
//						console.log(this.res[i].name)
						str1=`<div class="s_box">
								<img src="${this.res[i].url}" qwe="${this.res[i].goodsId}"/>
							</div>
							<div class="b_box">
								<img src="${this.res[i].url}"/>
							</div>
							<div class="main-b-b">
							<a href="##"><i class="i3"></i></a>
							<div class="tu">							
								<img src="${this.res[i].url}"  class="fangda-s"/>
								<img src="images/t3.jpg"  class="fangda-s"/>
								<img src="images/fangda-s.jpg"  class="fangda-s"/>
								<img src="images/t1.jpg"  class="fangda-s"/>
							</div>
							<a href="##"><i class="i4"></i></a>`;
						str2 = this.res[i].name;
						str3 =`<p class="main-p-n">￥${this.res[i].price}</p>`;
						str4 = `￥${this.res[i].price}`;
					}
					
				}
				this.tu.html(str1);
				this.nm.html(str2);
				this.price.html(str3);
				this.total.html(str4);
				
				if(this.msg){
					$(".deng").hide();
					$(".deng2").show();
					$(".deng2").find(".d1").html(JSON.parse(this.msg).user);
				}else{
					$(".deng").show();
					$(".deng2").hide();
				}
				
				$(".deng2").find(".z1").click(function(){
					localStorage.removeItem("loginUser");
					$(".deng").show();
					$(".deng2").hide();
				})
						
						this.addEvent();
			}
			addEvent(){
				var that = this;
				
				this.btn1 = $(".btn1");
//				console.log(this.btn1);
				this.btn1.on("click",function(){
					console.log(that.sImg.getAttribute("qwe"));
					that.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
//					console.log(getCookie("goods"));
					for(var i in that.goods){
//						console.log(that.goods[i].id);
//						if(that.goods[i].id === that.sImg.getAttribute("qwe")){
////							console.log(1);
//							that.changeCookie();
//						}else{
//							console.log(that.goods);
//							setCookie("goods",JSON.stringify({"id":that.sImg.getAttribute("qwe")}));
//							
////							setCookie();
//							console.log(that.goods);
////							console.log(1);
//						}
					}
				});
				
				this.sBox = document.querySelector(".s_box");
				this.bBox = document.querySelector(".b_box");
				this.oTu = document.querySelectorAll(".fangda-s");
				this.sImg = this.sBox.children[0];
				this.bImg = this.bBox.children[0];
				
				this.s = $("s");
//				console.log(this.s.html());
				this.reduce = $("#left");
				this.plus = $("#right");
				this.price = $(".money u");
				this.btn1 = $(".btn1");
				this.num = parseFloat(this.s.html());
				this.sum = parseFloat($(".main-p-n").html().split("￥")[1]);
//				console.log($(".main-p-n").html());
				this.price[0].innerHTML = "￥"+this.sum*this.num;
				
				this.addEvent2();
				
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
				for(var i=0;i<this.oTu.length;i++){
					this.oTu[i].onclick=function(){
						console.log(this);
						that.sImg.src=this.src;
						that.bImg.src=this.src;
					}
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
			addEvent2(){
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
//			changeCookie(){
//				console.log(1);
//				var n = JSON.parse(JSON.stringify(this.goods).slice(1,-1)).num
//				n += parseInt($("s").html());
//				console.log(n);
//				setCookie("goods",JSON.stringify(this.goods));
//				console.log(this.goods);
//				
//			}
		}
		
		new Search();
		
		

})();

//addCar(){
//  var that = this;
//  this.oCar.on("click.abc", function(){
//          that.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
//          if (that.goods.length == 0) {
//              that.goods.push({
//                  id: that.inf.goodsid,
//                  num: 1
//              })
//              that.inf.num--;
//          } else {
//              var j;
//              var onoff = that.goods.some((val, index) => {
//                  j = index;
//                  return val.id == that.inf.goodsid;
//              })
//              if (onoff) {
//                  that.goods[j].num++;
//                  that.inf.num--;
//              } else {
//                  that.goods.push({
//                      id: that.inf.goodsid,
//                      num: 1
//                  })
//                  that.inf.num--;
//              }
//          }
//          var str3 = "";
//          str3 += `${that.inf.num}`;
//          that.box5.html(str3);
//
//
//          console.log(that.goods);
//          setCookie("goods", JSON.stringify(that.goods));
//
//          if (that.inf.num == 0) {
//              that.oCar.off("click.abc");
//              var mb = $("<p class = 'mb'>售罄</p>");
//              $(this).parent(".details").prev(".imgBox").find(".table").find("img").after(mb);
//          }
//      } else {
//          alert("请先登录！");
//          location.href = "../html/log.html";
//      }
//  })
//}