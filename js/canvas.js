window.onload = () => {
  const canvas = document.getElementById('canvas');
  const saveButton = document.getElementById('save');
  const loadInput = document.getElementById('load');
};

$(function(){
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");
    var canvasOffset=$("#canvas").offset();
    var offsetX=canvasOffset.left;
    var offsetY=canvasOffset.top;
    //context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;
    var context;
    $('#skyblue').click(function(){
      context.strokeStyle = "#a2b9bc";
    });
    $('#red').click(function(){
      context.strokeStyle = "#FF0000";
    });
    $('#black').click(function(){
      context.strokeStyle = "#000000";
    });
        $('#canvas').mousedown(function(e){
            var touchX = e.clientX - offsetX;
            var touchY = e.clientY - offsetY;
            paint = true;
            clickX.push(e.clientX-offsetX);
            clickY.push(e.clientY-offsetY);
            lastX=touchX;
            lastY=touchY;
        });
        $('#canvas').mousemove(function(e){
            if(paint){
                var x=e.clientX-offsetX;
                var y=e.clientY-offsetY;
                clickX.push(x);
                clickY.push(y);
                context.beginPath();
                context.moveTo(lastX,lastY)
                context.lineTo(x,y);
                context.stroke();
                context.closePath();
                lastX=x;
                lastY=y;
            }
        });
        $('#canvas').mouseup(function(e){
            paint = false;
        });
        $('#canvas').mouseleave(function(e){
            paint = false;
        });
        $('#save').click(function() {       
        html2canvas($("#canvas"), {
            onrendered: function(canvas) {         
                var imgData = canvas.toDataURL(
                    'image/png');        //converting first to PNG then to PDF inorder to store created content      
                var doc = new jsPDF('p', 'mm');
                doc.addImage(imgData, 'PNG', 10, 10);
                doc.save('canvas.pdf');
            }
        });
    });
 

  

 });