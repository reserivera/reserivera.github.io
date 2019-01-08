
$(document).ready(function(){
  /*$(".container").hover(function(){
	  console.log("in");
      var range = 15;
      var image = document.getElementsByClassName("image");
	  console.log(image);
      var color = "background: rgb("+getRandomInt(0,255)+","+getRandomInt(0,255)+","+getRandomInt(0,255)+");";
      
      var sizeInt = getRandomInt(10, 30);
      size = "height: " + sizeInt + "px; width: " + sizeInt + "px;";
      
      var left = "left: " + getRandomInt(image.left -range-sizeInt, image.left+range) + "px;";
      
      var top = "top: " + getRandomInt(image.top-range-sizeInt, image.top+range) + "px;"; 

      var style = left+top+color+size;
      $("<div class='ball' style='" + style + "'></div>").appendTo('.image').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){$(this).remove();});
	 
   });
 */
 var swoop = d3.select(".swoop"),
    arrow = d3.select(".arrow"),
    path = swoop.node(),
    totalLength = path.getTotalLength();

draw(true);

function draw(immediate) {

  var t = d3.transition()
      .duration(4000)
      .delay(immediate ? 0 : 1000)
      .on("start",function(){
        d3.selectAll("path").style("display", "block");
      })
      .on("end",draw);

  arrow.transition(t)
    .attrTween("transform",function(){
      return function(t){
        var pos = t * totalLength;
        return "translate(" + pointAtLength(pos) + ") rotate( " + angleAtLength(pos) + ")";
      };
    });

  swoop.transition(t)
    .attrTween("stroke-dasharray",function(){
      return d3.interpolateString("0," + totalLength,totalLength + "," + totalLength);
    });

}


function pointAtLength(l) {

  var xy = path.getPointAtLength(l);
  return [xy.x, xy.y];

}

// Approximate tangent
function angleAtLength(l) {

  var a = pointAtLength(Math.max(l - 0.01,0)), // this could be slightly negative
      b = pointAtLength(l + 0.01); // browsers cap at total length

  return Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;

}	
	
	
/*	
  var mousePos = {};
 
 function getRandomInt(min, max) {
   return Math.round(Math.random() * (max - min + 1)) + min;
 }
  
  $(window).mousemove(function(e) {
    mousePos.x = e.pageX;
    mousePos.y = e.pageY;
  });
  
  $(window).mouseleave(function(e) {
    mousePos.x = -1;
    mousePos.y = -1;
  });
  
  var draw = setInterval(function(){
    if(mousePos.x > 0 && mousePos.y > 0){
	  
      var range = 15;
      
      var color = "background: rgb("+getRandomInt(0,255)+","+getRandomInt(0,255)+","+getRandomInt(0,255)+");";
      
      var sizeInt = getRandomInt(5, 10);
      size = "height: " + sizeInt + "px; width: " + sizeInt + "px;";
      
      var left = "left: " + getRandomInt(mousePos.x-range-sizeInt, mousePos.x+range) + "px;";
      
      var top = "top: " + getRandomInt(mousePos.y-range-sizeInt, mousePos.y+range) + "px;"; 

      var style = left+top+color+size;
      $("<div class='ball' style='" + style + "'></div>").appendTo('main').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){$(this).remove();}); 
    }
  }, 1);
*/
});