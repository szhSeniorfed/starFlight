# canvas 实现刮一刮插件
<p>scratchCard.js 刮一刮插件</p>
<p>使用方法:</p>
html引入<script src="js/scratchCard.js"></script>  <br />
var secretCard = new scratchCard('#secretCard', {  
    preload: ['images'],  
    tipsText: '提示语',  
    startFn: function() {  
    },  
    overFn: function() {  
}.bind(this)});  
