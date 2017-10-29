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
var character = {
  x: 100,
  y: 100,
  r: 10
}

var mouse = {
  x: 0,
  y: 0
}
var click = false;
var keys = [];

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
    return setInterval(draw, 60/100); // Framerate (default: 60 FPS)

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
    if(click) {
      click = false;
    }
    else {
      click = true;
    }
  }
  window.onmouseup=function(e) {
    //Code
  }
}

// Runs every frame
function update(){
    requestAnimationFrame(update);

    if(keys[38]) { // Up arrow
      character.y--;
    }

    if (keys[40]) { // Down arrow
      character.y++;
    }
    if (keys[39]) { // Right arrow
      character.x++;
    }
    if (keys[37]) { // Left arrow
      character.x--;
    }

    //Keep character within canvas
    if(character.x > WIDTH) {
      character.x = WIDTH;
    }
    if(character.x < 0) {
      character.x = 0;
    }
    if(character.y > HEIGHT) {
      character.y = HEIGHT;
    }
    if(character.y < 0) {
      character.y = 0;
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
    if(!click) {
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
    }
    else {
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";
    }

    circle(character.x, character.y, character.r);
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
