
const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
const cellSize = canvas.height/20;

let cellDraw = {
  context: ctx,
  x: 0,
  y: 0,
  cellSize: canvas.height/20,
  lineWidth: 4,
  get size(){
     return this.cellSize-this.lineWidth;
  },
  strokeStyle : 'DarkSlateGray',
  fillStyle: 'DarkSeaGreen',
  

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

let snake = {
  head: [320, 200],
  tail: [[320-cellSize, 200],
         [320-cellSize*2, 200],
         [320-cellSize*3, 200]],
  render(cell){
    for (let partLocation of [this.head,...this.tail]){
      [cell.x, cell.y]=partLocation;
      cell.render();
    };
  },  
}

snake.render(cellDraw);
