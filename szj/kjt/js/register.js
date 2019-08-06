
;(function(){
	
	$("#top").load("http://localhost/test/szj/kjt/public/public.html .bTop");
	$("header").load("http://localhost/test/szj/kjt/public/public-s.html .tou");
	$("footer").load("http://localhost/test/szj/kjt/public/public-s.html .xia");


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
			
	class Register{
		constructor(){
			
			this.ouser = $(".txt-u");
			this.opass1 = $(".txt-p1");
			this.opass2 = $(".txt-p2");
			this.oyz = $(".txt-r");
			this.oma = $(".ma");
			this.ozhu = $(".bReg");
			this.ocheck = $(".checkbox");
			this.state = $(".state");
			this.oma.html(this.random(1000,9999));
			this.url = "http://api.icodeilife.cn:81/user";
			
			
		this.telonOff = this.passonOff = this.pass2onOff = this.yzonOff = this.checkonOff = false; 
			
			
			this.ver();	
		}
		ver(){
			var that = this;
			this.ouser.on("blur",function(){
				that.uReg();
			})
			
			this.opass1.on("blur",function(){
				that.pass1Reg();
			})
			
			this.opass2.on("blur",function(){	
				that.pass2Reg();
			})
			
			this.oma.on("click",function(){
				$(this).html(that.random(1000,9999));
			})
			this.oyz.on("input",function(){
				that.yzReg();
			})
			
			if(this.ocheck.checked="checked"){
				this.checkonOff = true;
			}else{
				this.checkonOff = false;
			}
			
			this.judge();
		}
		uReg(){
			let telReg = /^1[3-9]\d{9}$/;
			if(telReg.test(this.ouser.val())){
				this.ouser.parent().next("b").html("");
				this.telonOff = true;
				console.log(this.telonOff);
			}else{
				this.ouser.parent().next("b").html("请输入正确的手机号");
				this.telonOff = false;
			}
		}
		pass1Reg(){
			var that = this;
			let passReg=/^\w{6,20}$/;
			if(!passReg.test(this.opass1.val())){
				this.opass1.parent().next("b").html("密码不合要求");
				this.passonOff=false;
				return;
			}else{
				this.opass1.parent().next("b").html("");
				this.passonOff=true;
			}
			this.passonOff=true;
			
			if(that.opass2.val() != "") return;
			if(this.opass1.val() === that.opass2.val()){
				that.opass2.parent().next("b").html("密码一致");
				that.pass2onOff=true;
			}else{
				that.opass2.parent().next("b").html("密码不一致，请重新输入");
				that.pass2onOff=false;
			}
		}
		pass2Reg(){
			var that = this;
			this.pass2onOff=true;
			if(this.opass2.val() === that.opass1.val()){
				this.opass2.parent().next("b").html("密码一致");
				that.passonOff=true;
			}else{
				this.opass2.parent().next("b").html("密码不一致，请重新输入");
				that.passonOff=false;
			}
		}
		yzReg(){
			if(this.oyz.val() === this.oma.html()){
				this.oyz.parent().next(".ma").next("b").html("验证码正确");
				this.yzonOff = true;
			}else{
				this.oyz.parent().next(".ma").next("b").html("验证码错误，请重新输入");
				this.yzonOff = false;
			}
		}
		judge(){
			var that = this;
//			console.log(this.telonOff);
			this.ozhu.on("click",function(){
//				if(that.telonOff){
//					alert("注册成功")
//				}else{
////					this.onclick = null;
//					alert("注册失败");
//				}
				that.load();
			})
		}
		load(){
			if(this.telonOff && this.passonOff && this.pass2onOff && this.yzonOff && this.checkonOff){
//					alert("注册成功")
					$.ajax({
						url:this.url,
						data:{
							type:"register",
							user:this.ouser.val(),
							pass:this.opass2.val()
						},
						success:(res)=>{
	//						console.log(res);
							res = JSON.parse(res);
							console.log(res);
							if(res.code == 0){
								this.state.html("注册失败，请重新<a href='register.html'>注册</a>");
							}else if(res.code == 1){
								this.state.html("注册成功，3秒后跳转到<a href='login.html'>登录</a>页面");
								setTimeout(()=>{
									location.href = "login.html"
								},3000)
							}
						}
					})
				}else{
//					this.onclick = null;
//					alert("注册失败");
				}
		}
		random(a,b){
			return Math.round(Math.random()*(a-b)+b);
		}
	}
	
	new Register();

})();
// && that.passonOff && that.pass2onOff && that.yzonOff && that.checkonOff