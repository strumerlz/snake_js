
const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
const cellSize = canvas.height/20;

let cellDraw = {
  context: ctx,
  x: 0,
  y: 0,
  lineWidth: 4,
  size: cellSize-this.lineWidth,
  strokeStyle : 'darkSlateGray',
  fillStyle: 'darkSeaGreen',
  
  stroke() {
    this.context.strokeStyle = this.strokeStyle;
    this.context.lineWidth = this.lineWidth;
    this.context.strokeRect(this.x, this.y, this.size, this.size);
  },
  fill() {
    this.context.fillStyle = this.fillStyle;
    this.context.fillRect(this.x, this.y, this.size, this.size);
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
  tail: [[320-this.cell.size, 200],
         [320-this.cell.size*2, 200],
         [320-this.cell.size*3, 200]],
  direction: { x: 1, y: 0},
  headStepCalc() {
    let dx = this.cell.size * this.direction.x;
    let dy = this.cell.size * this.direction.y;
    this.head[0] += dx;
    this.cell[1] += dy;
  },
  tailStepCalc() {
    this.tail.unshift(this.head);
    this.tail.pop()
  },
  move(){
    this.headStepCalc();
    this.tailStepCalc();    
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
  render(){
    for (let partLocation of [this.head,...this.tail]){
      [this.cell.x, this.cell.y]=partLocation;
      this.cell.render();
    };
  },  
}

//console.log([snake.head, ...snake.tail]);
//snake.move();
//console.log([snake.head, ...snake.tail]);
//snake.render(cellSnake);
