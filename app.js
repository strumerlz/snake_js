
const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
const lineWidth = 4;
const cellSize = canvas.height/20-lineWidth;

let square = {
  context: ctx,
  x: 0,
  y: 0,
  size: cellSize,
  strokeStyle : 'DarkSlateGray',
  fillStyle: 'DarkSeaGreen',
  lineWidth: lineWidth,

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
  render(sqr){
    for (let partLocation of [this.head,...this.tail]){
      [sqr.x, sqr.y]=partLocation;
      sqr.render();
    };
  },  
}

snake.render(square);
