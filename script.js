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
let rightPressed = false;
let leftPressed = false;
let paddleX = (canvas.width - paddleWidth)/2;
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup',keyUpHandler, false);

function keyDownHandler(e){
  if(e.keyCode == 39){
    rightPressed = true;
  }
  if(e.keyCode == 37){
    leftPressed = true;
  }
}

function keyUpHandler(e){
  if(e.keyCode == 39){
    rightPressed = false;
  }
  if(e.keyCode == 37){
    leftPressed = false;
  }
}

function draw(){
//clear
  ctx.clearRect(0,0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
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
  //Top Bottom (Game Over)
  if(y + dy < ballRadius){
    dy = -dy;
  } else if(y + dy + ballRadius > canvas.height){
    gameOver();
  }
  //Paddle Detection
  if(y > canvas.height-paddleHeight-ballRadius && x < paddleX+paddleWidth && x > paddleX){
    dy = -dy;
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
}

function gameOver(){
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", 80 , canvas.width/2);
}

window.setInterval(draw, 10);
