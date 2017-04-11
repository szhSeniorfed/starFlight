var secret = {
	data: {
		IS_LOAD: false
	},
	result:["10000万","100万","10万","5万","-10000万","-100万","-10万","-5万","什么都没有","你长得真美","给我个红包吧","你做梦呢","想啥呢","别自恋啊","好好编码","去一边静静去","00000"],
	// 绑定事件
	bindEvent: function() {
		document.getElementById('secretCard').addEventListener('touchmove', function(e) {
			e.preventDefault();
		});
		common.touchend(function(e) {
			var action = e.target.dataset.action;
			var title = e.target.innerHTML;
			switch (action) {
				case 'more':
					location.replace(location.href);
					break;
				case 'share':
					break;
			}
		}.bind(this));
	},
	// 获取信息
	getData: function() {
		var n=Math.floor(Math.random()*secret.result.length+1)-1;
		var secretCard = new scratchCard('#secretCard', {
			preload: ['images/secret/slogan.png'],
			tipsText: '刮开涂层',
			startFn: function() {
				var elTips = document.querySelector('#secretCard p');
				// elTips.style.display = 'block';
				elTips.innerHTML = secret.result[n];
				elTips.classList.add('current');
			},
			overFn: function() {
				this.data.IS_LOAD = true;
			}.bind(this)
		});
	},
	// 初始化
	init: function() {
		var UA = navigator.userAgent.toUpperCase();
		var devicesType = UA.match(/IPHONE|IPOD|IPAD/) ? "IOS" : "ANDROID";
		if (devicesType === "IOS") {
			[].slice.call(document.querySelectorAll('.iosItem')).forEach(function(item) {
				item.classList.remove('none');
			});
		}
		this.bindEvent();
		this.getData();
	}
};
secret.init();
