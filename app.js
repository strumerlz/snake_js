const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
const height = canvas.height; 
ctx.lineWidth = 2;
let square = {
  x,
  y,
  size : height / 40,
  strokeStyle : 'rgb(0, 0, 0)',
  lineWidth : 2,
}
function drawSquare(x, y, size, strokeStyle, context){
  context.strokeStyle = strokeStyle;
  context.strokeRect(x, y, x+size, y+size);
}

drawSquare(10, 10, squareSize, strokeStyle, ctx);

function snake() {
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.strokeRect(10, 10, 20, 20);
  /* for (let [i,k] = [0,0]; i < 6; i++) {
     for (let j = 0; j < 6; j++,k++) {
      
       setTimeout(()=>{
           ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ', ' +
           Math.floor(255 - 42.5 * j) + ', 0)';
           ctx.fillRect(j * 25, i * 25, 25, 25)
       }, 100*k);
     }
   }*/
}