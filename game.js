/*
* Skeleton code for a browser game
* Instructions:
*
* 1. At the top of index.html:
  <link rel="stylesheet" href="style.css">
  <canvas id="canvas" width="650px" height="650px">
This text is displayed if your browser does not support HTML5 Canvas.
  </canvas>
*
* 2. At the bottom of index.html:
   <script src="game.js"></script>
*
* 3. In style.css:
    canvas {
      border: 1px solid #000;
      }
*
*/
var canvas;
var ctx;
var WIDTH = 650;
var HEIGHT = 650;
var dim = 65;
var cols = Math.floor(HEIGHT / dim);
var rows = Math.floor(WIDTH / dim);
console.log(rows);
var grid;
var options = [];
var numShrims = 15;

var mouse = {
  x: 0,
  y: 0
}
var click = false;
var keys = [];
var isOver = false;
var isWin = false;
var Shrimad = true;
var shrimimg = new Image();
shrimimg.src = "red.png";

/*
* @param {int} x - x Coordinate
* @param {int} y - y Coordinate
* @param {int} r - Circle's radius
* Draw a circle at a specified (x,y) coordinate
* With a specified radius
*/

function circle(x,y,r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.fill();
}

/*
* @param {int} x - x Coordinate
* @param {int} y - y Coordinate
* @param {int} w - Rectangle's width
* @param {int} h - Rectangle's height
* Draws a rectangle at a specified (x,y) coordinate
* With a specified width and height
*/

function rect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

//Clear the canvas
function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// Starting Function
function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    boardSetUp();
    return setInterval(draw, 60/100); // Framerate (default: 60 FPS)


}

function makeBoardArray() {
  var arr = new Array(rows);
  for(var i=0; i<arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function boardSetUp() {
  grid = makeBoardArray();
  for(var i = 0; i < rows; i++) {
    for(var j = 0; j < cols; j++) {
      grid[i][j] = new Cell(i, j, dim);
    }
  }

  for(var i=0; i<rows; i++) {
    for(var j=0; j<cols; j++) {
      options.push([i, j]);
    }
  }
  chooseShrims();

  for(var i = 0; i<rows; i++) {
    for(var j = 0; j<cols; j++) {
      grid[i][j].countShrims(grid);
    }
  }
}

function chooseShrims() {
  for(var q = 0; q<numShrims; q++) {
    var index = getRandomInt(0, options.length);
    console.log("test" + index);
    var i = options[index][0];
    var j = options[index][1];
    options.splice(index, 1);
    grid[i][j].shrim=true;
    console.log(grid[i][j]);
  }
}

function mouseClicked(x, y) {
  for(var i = 0; i<rows; i++) {
    for(var j = 0; j<cols; j++) {
      var temp = grid[i][j];
       if(x > temp.x && x < temp.x+temp.w && y > temp.y && y< temp.y+temp.w) {
         if(!temp.shrim) temp.reveal();
         else isOver = true;
       }
    }
  }
}

function gameOver() {

  var count = 0;
   for(i in grid) {
     for(j in grid) {
       if(isOver) {
         grid[i][j].reveal();
       }
       if(!grid[i][j].show && !grid[i][j].shrim) count++;
     }
   }
   if(count == 0) {
     isOver = true;
     isWin = true;
   }

   if(isOver) {
     if(Shrimad && !isWin) {
       document.getElementById("turn").innerHTML = "Shrim-Very-Mad Wins!";
       shrimimg.src = "red.png";
     }
     else if(Shrimad && isWin) {
       document.getElementById("turn").innerHTML = "Shrimad Wins!";
       shrimimg.src = "blue.png";
     }
     else if(!Shrimad && !isWin) {
       document.getElementById("turn").innerHTML = "Shrimad Wins!";
       shrimimg.src = "blue.png";
     }
     else {
       document.getElementById("turn").innerHTML = "Shrim-Very-Mad Wins!";
       shrimimg.src = "red.png";
     }
   }
}

//track mouse position
function mousePos(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}
//check mouse pressed and mouse position
window.onload = function() {
  document.captureEvents(Event.MOUSEMOVE);
  document.onmousemove = function (e) {mousePos(e);};
  window.onclick=function(e) {
    var evnt = window.event || e;
    mouse.x = evnt.clientX;
    mouse.y = evnt.clientY;
    if(!isOver) {
      mouseClicked(mouse.x, mouse.y);
      if(Shrimad) Shrimad = false;
      else Shrimad = true;
    }
  }
}

// Runs every frame
function update(){
    requestAnimationFrame(update);
    gameOver();
    if(Shrimad) {
      document.getElementById("turn").innerHTML = "Shrimad's Turn";
      shrimimg.src = "red.png";
      document.getElementById("image").src = "blue.png";
    }
    else {
      document.getElementById("turn").innerHTML = "Shrim-Very-Mad's Turn";
      shrimimg.src = "blue.png";
      document.getElementById("image").src = "red.png";
    }
}

/*
* @param {int} min - Minimum value
* @param {int} max - Maximum value
* Return a random integer between two specified values
*/
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//Runs every frame and draws to canvas
function draw() {
    clear();
    ctx.fillStyle = 'white';
    ctx.strokeStyle = "black";
    ctx.font = "30px Oleo Script";

    for(var i=0; i<rows; i++) {
      for(var j=0; j<cols; j++) {
        var temp = grid[i][j];
        if(temp.show) ctx.fillStyle = 'gray';
        rect(temp.x, temp.y, temp.w, temp.w);



        if(temp.shrim  && temp.show) {
          ctx.strokeStyle = "black";
          ctx.fillStyle = "red";
          //circle(temp.x+temp.w*0.5, temp.y+temp.w*0.5, temp.w*0.25);
          ctx.drawImage(shrimimg, temp.x + 10, temp.y + 10);
        }

        if(temp.shrimCount > 0 && temp.show) {
          ctx.fillStyle = "black";
          ctx.fillText(temp.shrimCount, temp.x+temp.w*0.35, temp.y+temp.w*0.65);
        }

        //ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
      }
    }
}

// Main part of program
init();
update();
//window.addEventListener('keydown',doKeyDown,true);
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
