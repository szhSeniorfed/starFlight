/**
 * 刮一刮canvas实现
 * Created By szh32589@ly.com
 * 使用方法：
 * html引入<script src="js/scratchCard.js"></script>
 * var secretCard = new scratchCard('#secretCard', {
			preload: ['images'],
			tipsText: '提示语',
			startFn: function() {
			},
			overFn: function() {
			}.bind(this)});
 * 更新日志:
 * 2016-09-30 创建 --szh
 */
(function(window, document, Math) {
	var isApp = navigator.userAgent.match(/iPhone|iPod|iPad|Android/i);
	// 刮刮卡效果
	function scratchCard(el, options) {
		this.el = typeof el == 'string' ? document.querySelector(el) : el;
		if (!this.el) {
			throw new Error('dom element can not be empty!');
		}

		this.options = {
			preload: [],			// array: 需要预加载的图片数组，因为图片加载速度可能会影响到 getBoundingClientRect
			bgColor: '#bebebe',		// string: 刮刮卡背景色
			tipsText: '刮奖区',		// string || array: 提示文案，多行则为数组类型，最多两行
			tipsColor: '#8c8c8c',	// string: 提示文案颜色
			loadFn: null,			// function: 加载完的回调函数
			startFn: null,			// function: 开始刮卡回调函数
			overFn: null			// function：结束后的回调函数
		};
		if (options) {
			for ( var i in options ) {
				this.options[i] = options[i];
			}
		}
		this.canvas = this.el.querySelector('canvas');
		this.context = this.canvas.getContext('2d');
		this.drawing = false;
		this.started = false;

		var numberMax = this.options.preload.length;
		var numberNow = 0;
		if (numberMax > 0) {
			for (var i = 0; i < numberMax; i++) {
				var image = new Image();
				image.onload = image.onerror = function() {
					console.log('preload image');
					numberNow++;
					if (numberNow >= numberMax) this.realy();
				}.bind(this);
				image.src = this.options.preload[i];
				image = null;
			}
		} else {
			this.realy();
		}
		//开始刮事件
		this.canvas.addEventListener(isApp ? 'touchstart' : 'mousedown', function(e) {
			e.preventDefault();
			this.drawing = true;
			if (!this.started) {
				this.context.globalCompositeOperation = 'destination-out';
				if (this.isFunction(this.options.startFn)) {
					this.options.startFn();
				}
				this.started = true;
			}
		}.bind(this), false);
		//结束刮事件
		this.canvas.addEventListener(isApp ? 'touchend' : 'mouseup', function(e) {
			e.preventDefault();
			this.drawing = false;
			var data = this.context.getImageData(0, 0, this.width, this.height).data;
			for (var i = 0, j = 0; i < data.length; i+=4) {
				if (data[i] && data[i+1] && data[i+2] && data[i+3]) {
					j++;
				}
			}
			if (j <= this.width * this.height * 0.8) { //当剩余区域小于0.8时即执行回调
				if (this.isFunction(this.options.overFn)) {
					this.options.overFn();
				}
			}
		}.bind(this), false);
		//刮事件
		this.canvas.addEventListener(isApp ? 'touchmove' : 'mousemove', function(e) {
			e.preventDefault();
			if (!this.drawing) return;
			if (e.changedTouches) {
				e = e.changedTouches[e.changedTouches.length - 1];
			}
			var x = (e.clientX + document.body.scrollLeft || e.pageX) - this.left || 0;
			var y = (e.clientY + document.body.scrollTop || e.pageY) - this.top || 0;
			this.context.fillStyle ="#ff0001";
			with(this.context) {
				beginPath();
				arc(x, y, 10, 0, Math.PI * 2);
				fill();
			}
		}.bind(this), false);
	}
	scratchCard.prototype = {
		isFunction: function(fn) {
			return typeof(fn) == 'function' ? true : false;
		},
		isArray: function(obj) {
			return Object.prototype.toString.call(obj) === '[object Array]';
		},
		realy: function() {
			this.pos = this.canvas.getBoundingClientRect();
			this.top = this.pos.top + document.body.scrollTop;
			this.left = this.pos.left + document.body.scrollLeft;
			this.width = this.canvas.offsetWidth;
			this.height = this.canvas.offsetHeight;
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			this.init();
		},
		init: function() {
			this.started = false;
			this.context.globalCompositeOperation = 'source-over';
			// 填充背景
			this.context.fillStyle = this.options.bgColor;
			this.context.fillRect(0, 0, this.width, this.height);
			// 填充文字
			this.context.fillStyle = this.options.tipsColor;
			this.context.font = '16px microsoft yahei';
			this.context.textAlign = 'center';
			this.context.textBaseline = 'middle';
			if (typeof(this.options.tipsText) == 'string') {
				this.context.fillText(this.options.tipsText, this.canvas.width / 2, this.canvas.height / 2);
			} else if (this.isArray(this.options.tipsText)) {
				this.context.fillText(this.options.tipsText[0], this.canvas.width / 2, this.canvas.height / 2 - 12);
				this.context.fillText(this.options.tipsText[1], this.canvas.width / 2, this.canvas.height / 2 + 12);
			}
			// 回调函数
			if (this.isFunction(this.options.loadFn)) {
				this.options.loadFn();
			}
		}
	};
	window.scratchCard = scratchCard;
})(window, document, Math);