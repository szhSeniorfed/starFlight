# canvas 实现刮一刮插件
star
scratchCard.js 刮一刮插件
使用方法：
html引入<script src="js/scratchCard.js"></script>
var secretCard = new scratchCard('#secretCard', {
    preload: ['images'],
    tipsText: '提示语',
    startFn: function() {
    },
    overFn: function() {
}.bind(this)});