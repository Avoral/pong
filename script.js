let canvas = document.getElementById('CanvasID');
let ctx = canvas.getContext("2d");

//Ball
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

//paddle
let paddleHeight = 10;
let paddleWidth = 80;
let rightPress = false;
let leftPress = false;
let paddleX = (canvas.width - paddleWidth)/2;
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup',keyUpHandler, false);

function keyDownHandler(e){
  if(e.keyCode == 39){
    rightPress = true;
  }
  if(e.keyCode == 37){
    leftPress = true;
  }
}

function keyUpHandler(e){
  if(e.keyCode == 39){
    rightPress = false;
  }
  if(e.keyCode == 37){
    leftPress = false;
  }
}

function draw(){
//clear
  ctx.clearRect(0,0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  if(rightPress) {
      paddleX += 7;
  }
  else if(leftPress) {
      paddleX -= 7;
  }
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  x += dx;
  y += dy;

  //wall Detection
  //Top Bottom
  if(y + dy < ballRadius || y + dy + ballRadius > canvas.height){
    dy = -dy
  }

  //Left right
  if(x + dx < ballRadius || x + dx + ballRadius > canvas.width){
    dx = -dx
  }
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#009900';
  ctx.fill();
  ctx.closePath();

//wall Detection
//Left right

}

window.setInterval(draw, 10);
