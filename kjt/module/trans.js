
define(function(){
	class trans{
		constructor(options,fn){
			this.tu = options.tu;
			this.nm = options.nm;
			this.price = options.price;
			this.total = options.total;
			this.url= options.url;
			this.deng = options.d;
			this.deng2 = options.d2;
			console.log(this.deng);
			this.fn = fn;
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
						that.display()
      					that.fn();		
						
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
							<img src="${this.res[i].url}"/>
						</div>
						<div class="b_box">
							<img src="${this.res[i].url}"/>
						</div>
						<div class="main-b-b">
						<a href="##"><i class="i3"></i></a>
						<div class="tu">							
							<img src="${this.res[i].url}"  class="fangda-s"/>
							<img src="images/t2.jpg"  class="fangda-s"/>
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
			
//			if(this.msg){
//				this.deng.hide();
//				this.deng2.show();
//				this.deng2.find(".d1").html(JSON.parse(this.msg).user);
//			}else{
//				this.deng.show();
//				this.deng2.hide();
//			}
//			
//			this.deng2.find(".z1").click(function(){
//				localStorage.removeItem("loginUser");
//				this.deng.show();
//				this.deng2.hide();
//			})
		}
	}
   	return trans
})


