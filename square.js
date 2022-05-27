const canvas = document.getElementById('square');
const ctx = canvas.getContext('2d');
const height = canvas.height;

let square = {
  context: ctx,
  x: 0,
  y: 0,
  size: 10,
  strokeStyle : 'red',
  fillStyle: 'orange',
  lineWidth: 1,

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

let square1 = Object.create(square);


square1.size = height / 5;
square1.strokeStyle = 'green';
square1.lineWidth = 5;
square1.context = ctx;

[square1.x, square1.y] = [50, 10];
square1.stroke();
[square1.x, square1.y] = [300, 50];
square1.stroke();
[square1.x, square1.y] = [250, 350];
square1.stroke();
[square1.x, square1.y] = [180, 40];
square1.stroke();