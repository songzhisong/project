;(function(){
	


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
		
		
//		登录注册
	
		var msg = localStorage.getItem("loginUser");
		console.log(msg);
		
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

})();