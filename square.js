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
    speed: 10,
    stepCalc(obj) {
      let dx = obj.size * this.direction.x;
      let dy = obj.size * this.direction.y;
      obj.x += dx;
      obj.y += dy;
    },

    on(obj) {
      let timeOut = 1000 / this.speed;
      this.stepCalc(obj);
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
          [this.direction.x, this.direction.y] = [-1, 0];
          break;
        case 'ArrowRight':
          [this.direction.x, this.direction.y] = [1, 0];
          break;
        case 'ArrowUp':
          [this.direction.x, this.direction.y] = [0, -1];
          break;
        case 'ArrowDown':
          [this.direction.x, this.direction.y] = [0, 1];
          break;
      }
    },
    directionListener() {
      let that = this;
      document.addEventListener('keydown', (event) => that.changeDirection(event));
    },
  };

  [square1.x, square1.y] = [60, 60];

  mover.directionListener();
  square1.render();
  mover.on(square1);
}