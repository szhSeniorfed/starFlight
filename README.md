# canvas 实现刮一刮插件
star
<p>scratchCard.js 刮一刮插件</p>
<p>使用方法:</p>
<p>html引入<script src="js/scratchCard.js"></script></p>
<p>var secretCard = new scratchCard('#secretCard', {</p>
    <p>preload: ['images'],</p>
    <p>tipsText: '提示语',</p>
    <p>startFn: function() {</p>
   <p> },</p>
    <p>overFn: function() {</p>
<p>}.bind(this)}); </p>