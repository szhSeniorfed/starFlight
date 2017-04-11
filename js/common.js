window.common = {
	debug: false,
	// 事件绑定公共方法
	touchend: function(callback) {
		var pageX, pageY, times;
		document.addEventListener('touchstart', function(e) {
			times = new Date();
			var touch = e.changedTouches[0];
			pageX = touch.pageX;
			pageY = touch.pageY;
		}, false);
		document.addEventListener('touchend', function(e) {
			times = new Date() - times;
			var touch = e.changedTouches[0];
			pageX -= touch.pageX;
			pageY -= touch.pageY;
			if (times <= 350 && Math.abs(pageX) < 5 && Math.abs(pageY) < 5) {
				if (typeof(callback) == 'function') callback.call(this, e);
			}
			pageX = null;
			pageY = null;
			times = null;
		}, false);
	},
	init: function() {
		window._hmt = window._hmt || [];
	}
};
common.init();