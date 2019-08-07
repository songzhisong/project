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

})();