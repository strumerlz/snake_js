const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;

let square = {
  context: ctx,
  x: 0,
  y: 0,
  size: 10,
  strokeStyle: this.context.strokeStyle,
  fillStyle: this.context.fillStyle,
  lineWidth: 1,

  stroke: function() {
    this.context.strokeStyle = this.strokeStyle;
    this.context.lineWidth = this.lineWidth;
    this.context.rect(this.x, this.y, this.x + this.size, this.y + this.size);
    this.context.stroke();
  },
  fill: function() {
    this.context.fillStyle = this.fillStyle;
    this.context.rect(this.x, this.y, this.x + this.size, this.y + this.size);
    this.context.fill();
  },
}

let square1 = Object.create(square);


square1.size = height / 40;
square1.strokeStyle = 'green';
square1.lineWidth = 2;
square1.context = ctx;

[square1.x, square1.y] = [10, 10];
square1.stroke();
