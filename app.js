const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');

let board = {
  canvas: document.getElementById('snake'),
  ctx: document.getElementById('snake').getContext('2d'),
  get cellSize() {
    return this.canvas.height / 20;
  },
  get leftBorder() {
    return 0 - cellSnake.cellSize;
  },
  get rightBorder() {
    return this.canvas.width;
  },
  get topBorder() {
    return 0 - this.cellSize;
  },
  get bottomBorder() {
    return this.canvas.height;
  },
  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  snapToGrid(coordinate, cellSize) {
    let remainder = coordinate % cellSize;
    let halfStep = cellSize / 2;
    if (remainder < halfStep) {
      return coordinate - remainder;
    } else {
      return coordinate - remainder + cellSize;
    }
  },
  genXY() {
    let x = Math.random() * this.rightBorder;
    let y = Math.random() * this.bottomBorder;
    return [x, y];
  },
}

let cellDraw = {
  context: board.ctx,
  x: 0,
  y: 0,
  lineWidth: 4,
  get strokeSize() {
    return board.cellSize - this.lineWidth;
  },
  strokeStyle: 'DarkSlateGray',
  fillStyle: 'DarkSeaGreen',

  stroke() {
    board.ctx.strokeStyle = this.strokeStyle;
    board.ctx.lineWidth = this.lineWidth;
    board.ctx.strokeRect(this.x, this.y, this.strokeSize, this.strokeSize);
  },
  fill() {
    board.ctx.fillStyle = this.fillStyle;
    board.ctx.fillRect(this.x, this.y, this.strokeSize, this.strokeSize);
  },
  render() {
    this.fill();
    this.stroke();
  },
};

let cellSnake = Object.create(cellDraw);
let cellFood = Object.create(cellDraw);
cellFood.strokeStyle = '#2f2f4f';
cellFood.fillStyle = '#8f8fbc';
let cellCollision = Object.create(cellDraw);
cellCollision.strokeStyle = '#4f2f2f';
cellCollision.fillStyle = '#bc8f8f';


let snake = {
  cell: cellSnake,
  head: [320, 200],
  tail: [],
  direction: {
    x: 1,
    y: 0
  },
  init() {
    for (let i = 1; i < 5; i++) {
      let arr = [this.head[0] - board.cellSize * i, this.head[1]];
      this.tail.push(arr);
    }
  },
  headStepCalc() {
    let dx = board.cellSize * this.direction.x;
    let dy = board.cellSize * this.direction.y;
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
  checkColisions() {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.head[0] === this.tail[i][0] && this.head[1] === this.tail[i][1]) {
        [cellCollision.x, cellCollision.y] = this.head;
        console.log([cellCollision.x, cellCollision.y]);
        cellCollision.render();
        game.over();
        return;
      }
    }
  },
  render() {
    for (let partLocation of [this.head, ...this.tail]) {
      [this.cell.x, this.cell.y] = partLocation;
      this.cell.render();
    };
  },
}

const food = new function() {
  this.cell = Object.create(cellDraw, {
    'strokeStyle': {
      value: '4f2f2f',
      writable: true
    },
    'fillStyle': {
      value: 'bc8f8f',
      writable: true
    }
  });
  this.gen = () => {
    let arr = [];
    arr.push(1);
    arr.push(2);
  }
}();

const game = {
  speed: 8,
  init() {
    snake.init();
    snake.render();
    snake.directionListener();
    this.pauseListener();
  },

  play() {
    if (this.busted === false || this.busted === undefined) {
      let timeOut = 1000 / this.speed;
      this.timerId = setTimeout(() => {
        snake.move();
        this.checkBoundaries();
        board.clearCanvas();
        snake.render();
        snake.checkColisions();
        this.play();
      }, timeOut);
    };
  },
  pause() {
    clearTimeout(this.timerId);
  },
  pausePlaySwitch(event) {
    if (event.code === 'Space' && (this.busted === false || this.busted === undefined)) {
      if (this.paused === true || this.paused === undefined) {
        this.paused = false;
        this.play();
        console.log('Play');
      } else {
        this.paused = true;
        this.pause();
        console.log('Pause');
      };
    };
  },
  pauseListener() {
    let that = this;
    document.addEventListener('keydown', (event) => that.pausePlaySwitch(event));
  },
  checkBoundaries() {
      if (snake.direction.x !== 0) {
      switch (snake.head[0]) {
        case board.leftBorder:
          snake.head[0] = board.rightBorder - board.cellSize;
          break;
        case board.rightBorder:
          snake.head[0] = 0;
          break;
        default:
      }
    } else {
      switch (snake.head[1]) {
        case board.topBorder:
          snake.head[1] = board.bottomBorder - board.cellSize;
          break;
        case board.bottomBorder:
          snake.head[1] = 0;
          break;
        default:
      }
    }
  },

  over() {
    clearTimeout(this.timerId);
    this.busted = true;
    console.log('GAME OVER')
  }
}






game.init();



//console.log([snake.head, ...snake.tail]);
//snake.move();
//console.log([snake.head, ...snake.tail]);
//snake.render(cellSnake);
