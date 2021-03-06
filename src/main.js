let snake = undefined;
let food = undefined;
let numberOfRows = 60;
let numberOfCols = 120;

let animator = undefined;

const animateSnake = function() {
  let oldHead = snake.getHead();
  let oldTail = snake.move();
  let head = snake.getHead();
  if (isGameOver(head)) return;
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if (head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows, numberOfCols);
    drawFood(food);
  }
}

const isGameOver = function(head) {
  let status = snake.isSnakeOverriding();
  let isTouch = snake.isSnakeHittingWall(numberOfCols,numberOfRows);
  if (isTouch || status) {
    removeActionListener();
    clearInterval(animator);
    showGameOverMessage();
    return true;
  }
}

const showGameOverMessage = function() {
  let message = document.getElementById("gameOver");
  message.style.visibility='visible';
}

const removeActionListener = function() {
  let grid = document.getElementById("keys");
  removeEventListener("onkeyup", changeSnakeDirection);
}

const changeSnakeDirection = function(event) {
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

const addKeyListener = function() {
  let grid = document.getElementById("keys");
  grid.onkeyup = changeSnakeDirection;
  grid.focus();
}

const createSnake = function() {
  let tail = new Position(12, 10, "east");
  let body = [];
  body.push(tail);
  body.push(tail.next());
  let head = tail.next().next();

  snake = new Snake(head, body);
}

const createFood = function(numberOfRows, numberOfCols) {
  food = generateRandomPosition(numberOfCols, numberOfRows);
}

const startGame = function() {
  createSnake();
  drawGrids(numberOfRows, numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows, numberOfCols);
  drawFood(food);
  addKeyListener();
  animator = setInterval(animateSnake, 140);
}

window.onload = startGame;
