
//$("#top").load("http://localhost/test/szj/kjt/public/public.html .bTop");
//$("header").load("http://localhost/test/szj/kjt/public/public.html .tou");
$("#footer").load("http://localhost/test/szj/kjt/public/public.html .footer");

//	楼梯
	$(function(){
			
			$('.nav li').click(function(){
		     // $(document).scrollTop($('.lou').eq($(this).index()).offset().top)
			 var t =$('.lou').eq($(this).index());
			 $("html").stop().animate({
			     scrollTop:t.offset().top
			 })	
			})
		})

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

	

//	banner
	$("#banner").banner({
        items:$("#banner").find("img"),        //必传
        left:$("#banner").find("#left"),       //可选
        right:$("#banner").find("#right"),     //可选
        list:true,
        autoPlay:true,                          //可选，默认有自动播放
//      delayTime:2000,                         //可选，默认2000
//      moveTime:100,                          //可选，默认300
        index:0                                //可选，默认0
    })
	
//	选项卡
	var oul = document.querySelector(".pavilion");
	var ali = oul.children;
	var acom = document.querySelectorAll(".commodity");
	
	for(var i=0;i<ali.length;i++){
		ali[i].index = i;	
		ali[i].onclick = function(){
			for(var j=0;j<ali.length;j++){
				ali[j].className = "";
				acom[j].style.cssText = "display:none";
			}
//			给当前li加样式
			this.className = "selected";
			acom[this.index].style.cssText = "display:block";
		}
	}
	
//	登录注册
	
	var msg = localStorage.getItem("loginUser");
//	console.log(msg);
	
	if(msg){
		$(".deng").hide();
		$(".deng2").show();
		$(".deng2").find(".d1").html(JSON.parse(msg).user);
		
		$(".car a").on("click",function(){
        	$(this).attr("href","car.html")
        })
	}else{
		$(".deng").show();
		$(".deng2").hide();
	}
	
	$(".deng2").find(".z1").click(function(){
		localStorage.removeItem("loginUser");
		$(".deng").show();
		$(".deng2").hide();
		location.reload();
	})
	
		var aimg = document.querySelectorAll("img");
		var arr = Array.from(aimg);
		var t;
		
		onload = onscroll = function(){
		    clearTimeout(t);
		    t = setTimeout(function(){
		        fn();
		    },100)
		}
		
		function fn(){
		    var scrollT = document.documentElement.scrollTop;
		    var clientH = document.documentElement.clientHeight;
		    
		    for(var i=0;i<arr.length;i++){
		        console.log(`i:${i}`);
		        if(arr[i].offsetTop - scrollT < clientH){
		            arr[i].src = arr[i].getAttribute("ljz");
		            arr.splice(i,1)
		        }
		    }
		}
})();