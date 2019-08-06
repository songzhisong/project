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
		
//	商品列表
		class List{
			constructor(){
				this.cont = document.querySelector(".cont");
				this.url = "http://localhost/test/szj/kjt/data/goods.json";
				this.load();
				this.addEvent();
			}
			load(){
				var that = this;
				ajaxGet(this.url,function(res){
//					console.log(res)
					that.res = JSON.parse(res);
//					console.log(that.res);
					that.display();
				});
				
			}
			display(){
				console.log(this.res);
				var str = "";
				this.res.forEach((val)=>{
					str += `<div class="box" qwe="${val.goodsId}">
					            <img src="${val.url}" alt="">
					            <p>${val.price}</p>
					            <span>${val.name}</span>
					            <em>${val.tip}</em>
					            <a class="btn" href="car.html">加入购物车</a>
					        </div>`;
				});
				this.cont.innerHTML = str;
				
			}
			addEvent(){
				var that = this;                                                                                                                                                                 
				this.cont.addEventListener("click",function(eve){
					if(eve.target.className == "btn"){
						that.id = eve.target.parentNode.getAttribute("qwe");
						that.setCookie();
					}
				});
				
			}
			setCookie(){
//				console.log(this.id);
				this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
				if(this.goods.length == 0){
					this.goods.push({
						id:this.id,
						num:1
					})
				}else{
					var i = 0;
					var onoff = this.goods.some((val,index)=>{
						i = index;
						return val.id == this.id;
					})
					if(onoff){
						this.goods[i].num++
					}else{
						this.goods.push({
							id:this.id,
							num:1
						})
					}
				}
				setCookie("goods",JSON.stringify(this.goods));
			}
		}
		new List();
		
})();