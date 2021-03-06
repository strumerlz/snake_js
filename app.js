'use strict';

let board = {
  canvas: document.getElementById('snake'),
  ctx: document.getElementById('snake').getContext('2d'),
  get cellSize() {
    return this.canvas.height / 20;
  },
  get leftBorder() {
    return 0 - this.cellSize;
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    let x = Math.random() * this.rightBorder - this.cellSize;
    let y = Math.random() * this.bottomBorder - this.cellSize;
    return [x, y];
  },
}

let cellDraw = {
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
    board.ctx.strokeRect(this.x + this.lineWidth / 2, this.y + this.lineWidth / 2, this.strokeSize, this.strokeSize);
  },
  fill() {
    board.ctx.fillStyle = this.fillStyle;
    board.ctx.fillRect(this.x + this.lineWidth / 2, this.y + this.lineWidth / 2, this.strokeSize, this.strokeSize);
  },
  render() {
    this.fill();
    this.stroke();
  },
};

let cellSnake = Object.create(cellDraw);
let cellCollision = Object.create(cellDraw);
cellCollision.strokeStyle = '#4f2f2f';
cellCollision.fillStyle = '#bc8f8f';

let snake = {
  cell: cellSnake,
  head: [340, 200],
  tail: [],
  direction: {
    x: 1,
    y: 0
  },
  init() {
    this.head = [340, 200];
    this.tail = [];
    for (let i = 1; i < 5; i++) {
      let arr = [this.head[0] - board.cellSize * i, this.head[1]];
      this.tail.push(arr);
    }
    this.render();
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
  grow() {
    this.tail.push([...[food.cell.x, food.cell.y]]);
  },
  checkColisions() {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.head[0] === this.tail[i][0] && this.head[1] === this.tail[i][1]) {
        [cellCollision.x, cellCollision.y] = this.head;
        console.log([cellCollision.x, cellCollision.y]);
        cellCollision.render();
        game.over();
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
      value: '#2f2f4f',
      writable: true
    },
    'fillStyle': {
      value: '#8F8FBC',
      writable: true
    }
  });
  this.genFoodLocation = function() {
    let location = board.genXY();
    let gridSnappedLoc = location.map((e) => board.snapToGrid(e, board.cellSize));
    [this.cell.x, this.cell.y] = gridSnappedLoc;
  }
  this.render = () => this.cell.render();
}();

const game = {
  speed: 1,
  score: 0,
  init() {
    this.reset();
    this.initListeners();
  },
  reset() {
    this.busted = false;
    this.paused = true;
    this.speed = 1;
    this.score = 0;
    [snake.direction.x, snake.direction.y] = [1, 0];
    board.clearCanvas();
    infoBar.initStateDisplay();
    infoBar.scoreDisplay();
    infoBar.speedDisplay();
    infoBar.clearBottomBar();
    snake.init();
    this.genFood();
    console.log('NEW GAME');
  },
  initListeners() {
    this.addDirectionListener();
    this.pauseListener();
    this.newGameListener();
  },
  ifFoodEaten() {
    if (snake.tail[0][0] === food.cell.x && snake.tail[0][1] === food.cell.y) {
      snake.grow();
      this.score++;
      infoBar.scoreDisplay();
      this.genFood();
    }
  },
  isFoodCollide() {
    let body = [snake.head, ...snake.tail];
    for (let i = 0; i < body.length; i++) {
      if (food.cell.x === body[i][0] && food.cell.y === body[i][1]) {
        return true;
      };
    };
  },
  genFood() {
    do {
      food.genFoodLocation();
    } while (this.isFoodCollide());
    food.render();
  },
  changeDirection(event) {
    if (!this.busted && !this.paused) {
      if (snake.direction.x === 0) {
        switch (event.key) {
          case 'ArrowLeft':
            [snake.direction.x, snake.direction.y] = [-1, 0];
            console.log('left');
            break;
          case 'ArrowRight':
            [snake.direction.x, snake.direction.y] = [1, 0];
            console.log('right');
            break;
          default:
        };
      } else {
        switch (event.key) {
          case 'ArrowUp':
            [snake.direction.x, snake.direction.y] = [0, -1];
            console.log('up');
            break;
          case 'ArrowDown':
            [snake.direction.x, snake.direction.y] = [0, 1];
            console.log('down');
            break;
          default:
        };
      };
    };
  },
  addDirectionListener() {
    let that = this;
    document.addEventListener('keydown', (event) => that.changeDirection(event));
  },
  play() {
    if (!this.busted) {
      let timeOut = 1000 / (5 + this.speed * 3);
      this.timerId = setTimeout(() => {
        snake.move();
        this.checkBoundaries();
        this.ifFoodEaten();
        this.ifSpeedIncrease();
        board.clearCanvas();
        food.render();
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
    if (event.code === 'Space' && !this.busted) {
      if (this.paused) {
        this.paused = false;
        this.play();
        infoBar.clearStateBar();
        console.log('Play');
      } else {
        this.paused = true;
        this.pause();
        infoBar.pauseDisplay();
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
  ifSpeedIncrease() {
    let step = 2;
    let remainder = this.score % step;
    if (this.score !== 0 && remainder === 0 && this.prevScore !== this.score) {
      this.prevScore = this.score;
      this.speed++;
      infoBar.speedDisplay();
    };
  },
  over() {
    clearTimeout(this.timerId);
    this.busted = true;
    infoBar.gameOverDisplay();
    infoBar.startNewGameDisplay()
    console.log('GAME OVER')
  },
  newGame(event) {
    if (event.key === 'Enter' && this.busted === true) {
      this.reset();
    }
  },
  newGameListener() {
    let that = this;
    document.addEventListener('keydown', (event) => that.newGame(event));
  },
}

let infoBar = {
  speed: document.getElementById('speed'),
  state: document.getElementById('state'),
  score: document.getElementById('score'),
  bottomBar: document.getElementById('bottom-info-bar'),
  speedDisplay() {
    this.speed.textContent = `${game.speed}`;
  },
  pauseDisplay() {
    this.state.textContent = `Pause`;
  },
  clearStateBar() {
    this.state.textContent = ``;
  },
  scoreDisplay() {
    this.score.textContent = `${game.score}`;
  },
  gameOverDisplay() {
    this.state.textContent = `Game Over`;
  },
  startNewGameDisplay() {
    this.bottomBar.textContent = `Press Enter to start new game`;
  },
  clearBottomBar() {
    this.bottomBar.textContent = ``;
  },
  initStateDisplay() {
    this.state.textContent = `Press space to start/pause`;
  },
};

game.init();
