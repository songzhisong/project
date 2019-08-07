;(function(){
	

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
				this.he = 0;
				$(".num").html(this.he);
				
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
//				console.log(this.res);
				var str = "";
				this.res.forEach((val)=>{
					str += `<div class="box" qwe="${val.goodsId}">
					            <img src="${val.url}" alt="">
					            <p>￥${val.price}</p>
					            <span>${val.name}</span>
					            <em>${val.tip}</em>
					            <a class="btn" href="car.html">加入购物车</a>
					        </div>`;
				});
//				console.log(this.res);
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

				for(var i in this.goods){
					this.he += parseFloat(this.goods[i].num);
					
				}
//				console.log(this.goods);
				$(".num").html(this.he);
			}
		}
		new List();
		
//	分页
		class Page{
			constructor(options){
				this.list = options.list;
				this.left = options.left;
				this.right = options.right;
				this.pageCont = options.pageCont;
				this.shu = options.shu;
				this.num = options.num;
				this.index = options.index;
				this.url = options.url;
				
				this.load();
				this.addEvent();
			}
			load(){
				ajaxGet(this.url,(res)=>{
					this.res = JSON.parse(res);
					this.shu.innerHTML = this.res.length;
//					console.log(this.shu.innerHTML);
					this.display()
					this.createPage()
				})
			}
			display(){
				var str = "";
				for(var i=this.index*this.num;i<(this.index+1)*this.num;i++){
					if(i<this.res.length){
						str += `<div class="box" qwe="${this.res[i].goodsId}">
						            <img src="${this.res[i].url}" alt="">
						            <p>${this.res[i].price}</p>
						            <span>${this.res[i].name}</span>
						            <em>${this.res[i].tip}</em>
						            <a class="btn">加入购物车</a>
						        </div>`;
					}
				}
				this.list.innerHTML = str;
			}
			createPage(){
				this.maxNum = Math.ceil(this.res.length / this.num);
				var str = "";
				for(var i=0;i<this.maxNum;i++){
					str += `<li>${i+1}</li>`
				}
				this.pageCont.innerHTML = str;
				
				this.setActive();
			}
			setActive(){
				for(var i=0;i<this.pageCont.children.length;i++){
					this.pageCont.children[i].className = "";
				}
				this.pageCont.children[this.index].className = "active";
			}
			addEvent(){
				var that = this;
				this.left.onclick = function(){
					that.changeIndex(0)
				}
				this.right.onclick = function(){
					that.changeIndex(1)
				}
			}
			changeIndex(type){
				if(type == 0){
					if(this.index == 0){
						this.index = this.maxNum-1;
					}else{
						this.index--;
					}
				}else{
					if(this.index == this.maxNum-1){
						this.index = 0
					}else{
						this.index++
					}
				}				
				this.setActive();

				this.display();
			}
		}
		new Page({
			list:document.getElementById("list"),
			left:document.getElementById("btnL"),
			right:document.getElementById("btnR"),
			pageCont:document.getElementById("page"),
			shu:document.getElementById("shu"),
			url:"http://localhost/test/szj/kjt/data/goods.json",
			num:5,
			index:1
		});
		
		
		var msg = localStorage.getItem("loginUser");
//		console.log(msg);
		
		if(msg){
			$(".deng").hide();
			$(".deng2").show();
			$(".deng2").find(".d1").html(JSON.parse(msg).user);
		}else{
			$(".deng").show();
			$(".deng2").hide();
		}
		
		$(".deng2").find(".z1").click(function(){
			localStorage.removeItem("loginUser");
			$(".deng").show();
			$(".deng2").hide();
		})
	
//		console.log($(".num"));
	
})();