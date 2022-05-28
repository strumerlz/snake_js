
const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');

let cellDraw = {
  context: ctx,
  x: 0,
  y: 0,
  cellSize: canvas.height/20,
  lineWidth: 4,
  get strokeSize(){
     return this.cellSize-this.lineWidth;
  },
  strokeStyle : 'DarkSlateGray',
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
  direction: {x: 1, y: 0},
  init(){
    for (let i=1; i<4; i++){
      let arr = [this.head[0]-this.cell.cellSize*i, this.head[1] ];
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
  move(){
    this.tailStepCalc();
    this.headStepCalc();        
  },
  changeDirection(event) {
    if (this.direction.x === 0) {
      switch (event.key) {
        case 'ArrowLeft':
          [this.direction.x, this.direction.y] = [-1, 0];
          break;
        case 'ArrowRight':
          [this.direction.x, this.direction.y] = [1, 0];
          break;
        default:
      };
    } else {
      switch (event.key) {
        case 'ArrowUp':
          [this.direction.x, this.direction.y] = [0, -1];
          break;
        case 'ArrowDown':
          [this.direction.x, this.direction.y] = [0, 1];
          break;
        default:
      };
    };
  },
  directionListener() {
    let that = this;
    document.addEventListener('keydown', (event) => that.changeDirection(event));
  },
  render(){
    for (let partLocation of [this.head,...this.tail]){
      [this.cell.x, this.cell.y]=partLocation;
      this.cell.render();
    };
  },  
}

function start(){
  snake.init();
  snake.directionListener();
  snake.render();
}

const game = {
  speed: 8,
  init(){
    snake.init();
    snake.render();
  },
  play(){
    let timeOut = 1000 / this.speed;
    setTimeout(() => {
      clearCanvas();
      snake.move();
      snake.render();
      this.play();
    }, timeOut);
  },
}

function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
game.init();


//console.log([snake.head, ...snake.tail]);
//snake.move();
//console.log([snake.head, ...snake.tail]);
//snake.render(cellSnake);
