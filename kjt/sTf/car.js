;(function () {

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

	//		登录注册

	var msg = localStorage.getItem("loginUser");
	console.log(msg);

	if (msg) {
		$(".deng").hide();
		$(".deng2").show();
		$(".deng2").find(".d1").html(JSON.parse(msg).user);
	} else {
		$(".deng").show();
		$(".deng2").hide();
	}

	$(".deng2").find(".z1").click(function () {
		localStorage.removeItem("loginUser");
		$(".deng").show();
		$(".deng2").hide();
	});
	//	购物车	
	class Car {
		constructor() {
			this.tbody = document.querySelector("tbody");
			this.url = "http://localhost/test/szj/kjt/data/goods.json";

			this.load();
			this.addEvent();
		}
		addEvent() {
			var that = this;
			this.tbody.addEventListener("click", function (eve) {
				if (eve.target.className == "del") {
					that.id = eve.target.parentNode.getAttribute("index");
					eve.target.parentNode.remove();
					that.changeCookie(function (i) {
						that.goods.splice(i, 1);
					});
				}
			});
			this.tbody.addEventListener("input", function (eve) {
				if (eve.target.className == "num") {
					that.id = eve.target.parentNode.parentNode.getAttribute("index");
					//						that.num = eve.target.value;
					that.changeCookie(function (i) {
						that.goods[i].num = eve.target.value;
					});
				}
				that.display();
			});
		}
		load() {
			var that = this;
			ajaxGet(this.url, function (res) {
				//					console.log(res)
				that.res = JSON.parse(res);
				that.getCookie();
			});
		}
		getCookie() {
			this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
			//				console.log(this.res);
			//				console.log(this.goods);
			this.display();
		}
		display() {
			var str = "";
			var count = 0;
			var sum1 = "";
			this.res.forEach(resVal => {
				this.goods.forEach(goodsVal => {
					sum1 = resVal.price * goodsVal.num;
					if (resVal.goodsId == goodsVal.id) {
						str += `<tr index=${resVal.goodsId}>
										<td><img src="${resVal.url}"/></td>
										<td>${resVal.name}</td>
										<td>￥${resVal.price}</td>
										<td><input class="num" type="number" value="${goodsVal.num}"/> </td>
										<td>￥${resVal.price * goodsVal.num}</td>
										<td class="del">移除</td>
									</tr>`;
						count += sum1;
					}
				});
			});
			this.tbody.innerHTML = str;
			$(".total-pay").html(count);
		}
		changeCookie(callback) {
			var i = 0;
			this.goods.some((val, index) => {
				i = index;
				return val.id == this.id;
			});
			callback(i);
			setCookie("goods", JSON.stringify(this.goods));
		}
	}

	new Car();

	var msg = localStorage.getItem("loginUser");
	//		console.log(msg);

	if (msg) {
		$(".deng").hide();
		$(".deng2").show();
		$(".deng2").find(".d1").html(JSON.parse(msg).user);
	} else {
		$(".deng").show();
		$(".deng2").hide();
	}

	$(".deng2").find(".z1").click(function () {
		localStorage.removeItem("loginUser");
		$(".deng").show();
		$(".deng2").hide();
	});

	//		console.log($(".num"));
})();