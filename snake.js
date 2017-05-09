let sCanvas = document.getElementById("sCanvas");
let ctx = sCanvas.getContext('2d');
let snakeSize = 10;
let w = 800;
let h = 500;
let score = 0;
let snakeg;
let egg;
let finalScore=0;
let highestScore=0;

let drawFunction = (function(){
  let snakeBody = function(x,y){
    ctx.fillStyle="#132020";
    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize)
    ctx.fillStyle="DarkSlateGrey"
    ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2)

  }
  let drawEgg = function(x,y){
    ctx.fillStyle="Ivory";
    ctx.beginPath();
    ctx.arc(x*snakeSize+5, y*snakeSize+5, snakeSize/2, 0, Math.PI*2,false);
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(x*snakeSize+5, y*snakeSize+5, snakeSize/4, 0, Math.PI*2,true);
    ctx.stroke();
    ctx.fill();
  }
  let scoreBoard = function(){
    let scoreBoardtext = "Score: " + score;
    ctx.fillStyle = 'blue';
    ctx.fillText(scoreBoardtext, 145, h-5);
  }

  let makeSnake = function() {
    let length = 80;
    //let snake = [];
    snakeg = [];
    for (let i = 0; i < length; i++){
      //console.log("makeSnake i=", i, ", rec=", {x: length - (i + 1), y:0});
      snakeg[i] = {x: length - (i + 1), y:0};
      //console.log("snakeg=", snakeg);
      //snake[i] = {x: length - (i + 1), y:0};
    }
    //console.log("in renderSnake, snake =", snake, ", snakeg=", snakeg);
    //console.log("snakeg= ", snakeg);
  }

let render = function(){
  ctx.fillStyle = "#009900";
  ctx.fillRect(0,0,w,h);

  let snakeX = snakeg[0].x;
  let snakeY = snakeg[0].y;

  if(direction == "right"){
    snakeX++;
  } else if (direction == 'left') {
    snakeX--;
  } else if (direction == 'up') {
    snakeY--;
  } else if (direction == 'down') {
    snakeY++;
  }
  if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || crash(snakeX, snakeY, snakeg)) {
    console.log(crash(snakeX, snakeY, snakeg));
    ctx.clearRect(0,0,w,h);
    gameloop = clearInterval(gameloop);
    finalScore = score;
    console.log("final Score is = ", finalScore);
    //sendHighscore(finalScore);
    score = 0;
    return;
  }
  if(snakeX== egg.x && snakeY==egg.y){
    //console.log("egg.x = ", egg.x, "egg.y = ", egg.y, "snakeX = ", snakeX, "snakeY = ", snakeY);
    var tail = {x:snakeX, y:snakeY};
    //console.log("tail = ", tail);
    score++;
    makeEgg();}
  else {
    var tail = snakeg.pop();
    console.log("snakeX = ", snakeX, "snakeY = ", snakeY, "snake [0] = ", snakeg[0]);
    tail.x = snakeX;
    tail.y = snakeY;
    //console.log("tail = ", tail);
    //console.log("snakeg currently = ", snakeg);
  }
  //tail piece is placed at the head
  snakeg.unshift(tail);
  //console.log("tail after shift = ", tail, "snakeg after unshift = ", snakeg )
  for (let i = 0; i < snakeg.length; i++) {
    //console.log("snakeg = ", snakeg);
      snakeBody(snakeg[i].x, snakeg[i].y);
  }
  drawEgg(egg.x,egg.y);
  scoreBoard();
}

let makeEgg = function(){
  egg = {
    x: Math.floor((Math.random()*79)+1),
    y: Math.floor((Math.random()*49)+1)
  }
  for (let i=0; i>snakeg.length; i++) {
    let snakeX = snake[i].x;
    let snakeY = snake[i].y;

   if (egg.x===snakeX || egg.y === snakeY || egg.y === snakeY && egg.x===snakeX) {
      egg.x = Math.floor((Math.random() * 60) + 1);
      egg.y = Math.floor((Math.random() * 40) + 1);
      }
    }
  console.log("Egg location: ", egg.x, egg.y);
  }
let crash = function(x,y,array){
  for(let i = 0; i < array.length; i++) {
      if(array[i].x === x && array[i].y === y)
      return true;
  }
  return false;
}

function updateHighestscore(){
  if(finalScore>highestScore){
    highestScore = finalScore;}
}

let init = function(){
  console.log("I've arrived in init");
  direction = "down";
  makeSnake();
  makeEgg();
  updateHighestscore();
  gameloop = setInterval(render, 100)
}
  return{
    init:init
  };

}());
