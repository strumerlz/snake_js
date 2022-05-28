const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');

let cellDraw = {
  context: ctx,
  x: 0,
  y: 0,
  cellSize: canvas.height / 20,
  lineWidth: 4,
  get strokeSize() {
    return this.cellSize - this.lineWidth;
  },
  strokeStyle: 'DarkSlateGray',
  fillStyle: 'DarkSeaGreen',

  stroke() {
    this.context.strokeStyle = this.strokeStyle;
    this.context.lineWidth = this.lineWidth;
    this.context.strokeRect(this.x, this.y, this.strokeSize, this.strokeSize);
  },
  fill() {
    this.context.fillStyle = this.fillStyle;
    this.context.fillRect(this.x, this.y, this.strokeSize, this.strokeSize);
  },
  render() {
    this.fill();
    this.stroke();
  },
}
let cellSnake = Object.create(cellDraw);
let cellFood = Object.create(cellDraw);
cellFood.strokeStyle = 'maroon';
cellFood.fillStyle = 'chocolate';

let snake = {
  cell: cellSnake,
  head: [320, 200],
  tail: [],
  direction: {
    x: 1,
    y: 0
  },
  init() {
    for (let i = 1; i < 4; i++) {
      let arr = [this.head[0] - this.cell.cellSize * i, this.head[1]];
      this.tail.push(arr);
    }
  },
  headStepCalc() {
    let dx = this.cell.cellSize * this.direction.x;
    let dy = this.cell.cellSize * this.direction.y;
    this.head[0] += dx;
    this.head[1] += dy;
  },
  tailStepCalc() {
    this.tail.unshift([...this.head]);
    this.tail.pop()
  },
  move() {
    this.tailStepCalc();
    this.headStepCalc();
  },
  changeDirection(event) {
    if (this.direction.x === 0) {
      switch (event.key) {
        case 'ArrowLeft':
          [this.direction.x, this.direction.y] = [-1, 0];
          console.log('left');
          break;
        case 'ArrowRight':
          [this.direction.x, this.direction.y] = [1, 0];
          console.log('right');
          break;
        default:
      };
    } else {
      switch (event.key) {
        case 'ArrowUp':
          [this.direction.x, this.direction.y] = [0, -1];
          console.log('up');
          break;
        case 'ArrowDown':
          [this.direction.x, this.direction.y] = [0, 1];
          console.log('down');
          break;
        default:
      };
    };
  },
  directionListener() {
    let that = this;
    document.addEventListener('keydown', (event) => that.changeDirection(event));
  },
  render() {
    for (let partLocation of [this.head, ...this.tail]) {
      [this.cell.x, this.cell.y] = partLocation;
      this.cell.render();
    };
  },
}
const game = {
  speed: 8,
  init() {
    snake.init();
    snake.render();
    snake.directionListener();
    this.pauseListener();
  },
  play() {
    let timeOut = 1000 / this.speed;
    this.timerId = setTimeout(() => {
      clearCanvas();
      snake.move();
      this.checkBoundaries();
      snake.render();
      this.play();
    }, timeOut);
  },
  pause() {
    clearTimeout(this.timerId);
  },
  pausePlaySwitch(event){
    if(event.code == 'Space'){
      
    if(this.paused == false){
      this.paused = true;
      this.pause(); 
      console.log('Pause');   
    } else {      
      this.paused = false;  
      this.play();
      console.log('Play');
    };
  };
  },
  pauseListener(){
    let that = this;
    document.addEventListener('keydown', (event)=>that.pausePlaySwitch(event));
  },
  checkBoundaries() {
    let leftBorder = 0 - cellSnake.cellSize;
    let rightBorder = canvas.width;
    let topBorder = 0 - cellSnake.cellSize;
    let bottomBorder = canvas.height;

    if (snake.direction.x !== 0) {
      switch (snake.head[0]) {
        case leftBorder:
          snake.head[0] = rightBorder - cellSnake.cellSize;
          break;
        case rightBorder:
          snake.head[0] = 0;
          break;
        default:
      };
    } else {
      switch (snake.head[1]) {
        case topBorder:
          snake.head[1] = bottomBorder - cellSnake.cellSize;
          break;
        case bottomBorder:
          snake.head[1] = 0;
          break;
        default:
      };
    };
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

game.init();



//console.log([snake.head, ...snake.tail]);
//snake.move();
//console.log([snake.head, ...snake.tail]);
//snake.render(cellSnake);
