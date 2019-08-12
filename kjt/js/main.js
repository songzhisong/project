require.config({
	baseUrl:"module",
	paths:{
		Maginfier:"Maginfier",
		trans:"trans",
		jq:"../libs/jquery.1.12.4"
	}
})

require(["jq","trans","Magnifier"],function(_,t,m){
	new t({
		tu: $(".main-b-l"),
		nm: $(".main-b-r h3"),
		price: $(".main-p-n"),
		total: $(".money u"),
		url:"http://localhost/test/szj/kjt/data/goods.json"
//		d: $(".deng"),
//		d2: $(".deng2")
	},
		function(){
			new m({
				msg: localStorage.getItem("loginUser"),
				sBox: document.querySelector(".s_box"),
				bBox: document.querySelector(".b_box"),
				oTu: document.querySelectorAll(".fangda-s"),
				sImg: document.querySelectorAll(".s_box img")[0],
				bImg: document.querySelectorAll(".b_box img")[0],
				
			})
		}
	)
})

