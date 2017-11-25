const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const htmlE = document.documentElement;
let balls = [];

function init() {
  let hw = htmlE.offsetWidth;
  let hh = htmlE.offsetHeight;
  canvas.width = hw;
  canvas.height = hh;
}

window.onresize = window.onload = init;

class Ball {
  constructor(x, y, direct) {
    this.x = x;
    this.y = y;
    this.globalAlpha = 1;
    this.color = 'rgb(255,192,203)';
    this.direct = direct;
  }

  set() {
    this.x += Math.cos(this.direct);
    this.y += Math.sin(this.direct);
    if (this.globalAlpha > 0) {
      this.globalAlpha = this.globalAlpha - 0.005;
    } else {
      this.globalAlpha = 0;
    }
  }

  paint() {
    if (this.globalAlpha <= 0) {
      return;
    }
    context.beginPath();
    context.globalAlpha = this.globalAlpha;
    context.strokeStyle = this.color;
    context.arc(this.x, this.y, 4, 0, Math.PI * 2, true);
    context.stroke();
  }
}

setInterval(() => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach(ball => {
    ball.paint();
    ball.set();
  })
}, 10);

setInterval(() => {
  balls.forEach((ball, index) => {
    if (ball.globalAlpha <= 0) {
      balls.splice(index, 1);
    }
  })
}, 1000);

let moveCallback = event => {
  event = event || window.event;
  let target = event.target || event.srcElement;
  let node = target.nodeName;
  if (node === 'LI' || node === 'INPUT' || node === 'A' || node === 'BUTTON') {
    return;
  }
  let mx = event.clientX;
  let my = event.clientY;
  let direct = Math.random() * 2 * Math.PI;
  let ball = new Ball(mx, my, direct);
  balls.push(ball);
}

document.onmousemove = moveCallback;
document.ontouchmove = moveCallback;