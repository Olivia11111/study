
$( document ).ready(function() {
var r = document.getElementById('range');
var max = r.getAttribute('max');
var min = r.getAttribute('min');
var w = r.clientWidth;
//w += r.offsetLeft;
var isDragging = false;
r.addEventListener('mouseover',moveTip,false);

var moveTip = (function(e){
    //if(isDragging){
     var posPerc = (r.value/max) * 100;
   var pixPos = (posPerc/100) * w;
    pixPos += r.offsetLeft;

    document.getElementById('tip').style.display = 'block';
     document.getElementById('tip').style.left = pixPos +'px';
    //}
});


});