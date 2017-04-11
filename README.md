# canvas 实现刮一刮插件
<p>scratchCard.js 刮一刮插件</p>
<p>使用方法:</p>
html引入<script src="js/scratchCard.js"></script>  <br />
var secretCard = new scratchCard('#secretCard', {<br />
    ##preload: ['images'],<br />
    ##tipsText: '提示语',<br />
    ##startFn: function() {<br />
    ##},<br />
    ##overFn: function() {<br />
}.bind(this)});<br />
