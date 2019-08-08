;(function () {

	$("#top").load("http://localhost/test/szj/kjt/public/public.html .bTop");

	//	通知栏
	function notice() {
		$(".top-l").find("span").animate({
			left: -100
		}, 20000).queue(function (next) {
			$(".top-l").find("span").css({
				left: 330
			});
			next();
		});
	}
	setInterval(function () {
		notice();
	}, 300);

	class Login {
		constructor() {
			this.url = "http://api.icodeilife.cn:81/user";

			this.user = $(".txt-u");
			this.pass = $(".txt-p");
			this.btn = $(".btn");
			this.state = $(".state");
			this.addEvent();
		}
		addEvent() {
			var that = this;
			this.btn.on("click", function () {
				that.load();
				//				console.log(1);
			});
		}
		load() {
			if (!this.user.val() && !this.pass.val()) {
				alert("用户名不能为空" + "\n" + "登录密码不能为空");
			} else if (!this.user.val()) {
				alert("用户名不能为空");
			} else if (!this.pass.val()) {
				alert("登录密码不能为空");
			} else {
				$.ajax({
					url: this.url,
					data: {
						type: "login",
						user: this.user.val(),
						pass: this.pass.val()
					},
					success: res => {
						this.res = JSON.parse(res);
						//						console.log(res);
						if (this.res.code == 0) {
							this.state.html("用户名不存在，请<a href='register.html'>注册</a>");
						} else if (this.res.code == 1) {
							this.setState();

							this.state.html("登录成功，3秒后跳转<a href='index.html'>首页</a>");
							setTimeout(() => {
								location.href = "index.html";
							}, 3000);
						} else if (this.res.code == 2) {
							this.state.html("账号密码不匹配，请重新<a href='login.html'>登录</a>");
						}
					}
				});
			}
		}
		setState() {
			localStorage.setItem("loginUser", JSON.stringify(this.res.msg));
		}
	}

	new Login();
})();