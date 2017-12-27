let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  isGameOver(head,oldTail);
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
}

const isGameOver= function (head,oldTail) {
  let status=isSnakeOverriding(snake.getHead(),snake.getBody())
  if (head.x>119 || head.x<0 || head.y>59 || head.y<0 || status) {
    removeActions();
    let message=document.getElementById("gameOver");
    message.innerHTML='Game Over';
  }
}

const isSnakeOverriding = function (head,body) {
  let status = false;
  for (var i = 0; i < body.length; i++) {
    if (body[i].x==head.x && body[i].y==head.y) {
        status=true;
    }
  }
  return status;
}

const removeActions = function () {
  clearInterval(animator);
  let grid=document.getElementById("keys");
  removeEventListener("onkeyup", changeSnakeDirection);
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
