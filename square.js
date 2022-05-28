{
  const canvas = document.getElementById('square');
  const ctx = canvas.getContext('2d');
  const height = canvas.height;

  let square = {
    context: ctx,
    x: 10,
    y: 50,
    size: 10,
    strokeStyle: 'red',
    fillStyle: 'white',
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

  square1.size = height / 20 - 2;
  square1.strokeStyle = 'green';
  square1.lineWidth = 2;
  square1.context = ctx;


  let mover = {
    direction: {
      x: 1,
      y: 0,
    },
    speed: 1,
    stepCalc(obj) {

      let dx = obj.size * this.direction.x;
      let dy = obj.size * this.direction.y;
      obj.x += dx;
      obj.y += dy;

    },

    on(obj) {
      let timeOut = 1000 / this.speed;
      this.stepCalc(obj);
      console.log(`direction.x is ${this.direction.x}`);
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        obj.render();
        this.on(obj);
      }, timeOut)
    },

    changeDirection(event) {
      // eslint-disable-next-line default-case
      switch (event.key) {
        case 'ArrowLeft':
          this.direction = {
            x: -1,
            y: 0
          };
          console.log(`ArrowLeft key was pressed, direction.x set ${this.direction.x}`);
          break;
        case 'ArrowRight':
          this.direction = {
            x: 1,
            y: 0
          };
          console.log(`ArrowRight key was pressed, direction.x set ${this.direction.x}`);
          break;
        case 'ArrowUp':
          this.direction = {
            x: 0,
            y: -1
          };
          console.log(`ArrowUp key was pressed, direction.x set ${this.direction.x}`);
          break;
        case 'ArrowDown':
          this.direction = {
            x: 0,
            y: 1
          };
          console.log(`ArrowDown key was pressed, direction.x set ${this.direction.x}`);
          break;
      }
    }
  };

  [square1.x, square1.y] = [60, 60];

  square1.render();
  mover.on(square1);
  mover.direction.x = -1;

  document.addEventListener('keydown', mover.changeDirection);

  let event = new Event('keydown', {
    bubbles: true,
    key: 'ArrowUp'
  });
  //setTimeout(canvas.dispatchEvent(event),2000);


  //window.requestAnimationFrame(move.on.call(move));



}
``