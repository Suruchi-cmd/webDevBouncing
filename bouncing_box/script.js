const boxes = document.querySelectorAll(".box");

const box = document.getElementById("box");
const container = document.querySelectorAll(".container")[0];
containerWidth = container.clientWidth;
containerHeight = container.clientHeight;
// ball_radius = box.clientHeight;
let x_pose = 0;
let y_pose = 0;
let id = null;
let dx = 1;
let dy = 1;
let reverse = false;
let straight = true;

// // clearInterval(id);
// function moveBox(box, dx, dy) {
//   let x_pose = parseFloat(box.style.left.split("px")[0]);
//   let y_pose = parseFloat(box.style.top.split("px")[0]);

//   if (x_pose >= containerWidth - ball_radius || x_pose <= 0) {
//     dx = -dx;
//   }
//   if (y_pose >= containerHeight - ball_radius || y_pose <= 0) {
//     dy = -dy;
//   }

//   x_pose = x_pose + dx;
//   y_pose = y_pose + dy;
//   box.style.left = x_pose + "px";
//   box.style.top = y_pose + "px";
//   requestAnimationFrame(() => {
//     moveBox(box, dx, dy);
//   });
// }

// function getRandomNumberInRange(min = 0, max = 100) {
//   return min + Math.random() * max;
// }

// function getNewBoxPosition(oneBox) {
//   const position = { x: 0, y: 0 };
//   position.x = getRandomNumberInRange(0, containerWidth - ball_radius);
//   position.y = getRandomNumberInRange(0, containerHeight - ball_radius);
//   oneBox.style.left = `${position.x}px`;
//   oneBox.style.top = `${position.y}px`;
//   return position;
// }

// function init() {
//   boxes.forEach((box) => {
//     let dx = 5;
//     let dy = 5;
//     getNewBoxPosition(box);
//     moveBox(box, dx, dy);
//   });
//   // moveBox(boxes[[0]]);
// }

class Ball {
  constructor(index, height, width) {
    this.index = index;
    this.height = height;
    this.width = width;
    this.dx = 1;
    this.dy = 1;
    this.xCollide = false;
    this.yCollide = false;
  }
  create() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    var element = document.createElement("div");
    element.classList.add("ball");
    // element.classList.add("box");
    console.log("created");
    container.appendChild(element);
    console.log("ball");
    element.style.width = `${this.width}px`;
    element.style.height = `${this.height}px`;
    element.style.backgroundColor = "#" + randomColor;
    element.style.position = "absolute";
    element.style.borderRadius = "50px";
    this.box = element;
  }

  getRandomNumberInRange(min = 0, max = 100) {
    return min + Math.random() * max;
  }

  getNewBoxPosition() {
    const position = { x: 0, y: 0 };
    position.x = this.getRandomNumberInRange(0, containerWidth - this.width);
    position.y = this.getRandomNumberInRange(0, containerHeight - this.height);
    this.box.style.left = `${position.x}px`;
    this.box.style.top = `${position.y}px`;
  }

  moveBox() {
    let x_pose = parseFloat(this.box.style.left.split("px")[0]);
    let y_pose = parseFloat(this.box.style.top.split("px")[0]);

    if (x_pose >= containerWidth - this.height || x_pose <= 0) {
      this.dx = -this.dx;
    }
    if (y_pose >= containerHeight - this.width || y_pose <= 0) {
      this.dy = -this.dy;
    }
    if (this.xCollide) {
      this.dx = -this.dx;
      console.log("here");
      this.xCollide = false;
    }
    if (this.yCollide) {
      this.dy = -this.dy;
      this.yCollide = false;
    }

    x_pose = x_pose + this.dx;
    y_pose = y_pose + this.dy;
    console.log(this.yCollide);
    this.box.style.left = x_pose + "px";
    this.box.style.top = y_pose + "px";
    requestAnimationFrame(() => {
      this.moveBox();
    });
  }

  createAndMove() {
    this.create();
    this.getNewBoxPosition();
    this.moveBox();
  }

  collidedX() {
    this.xCollide = true;
  }

  collidedY() {
    this.yCollide = true;
  }

  get Xposition() {
    return parseFloat(this.box.style.left.split("px")[0]);
  }

  get Yposition() {
    return parseFloat(this.box.style.top.split("px")[0]);
  }
}

function checkCollision(boxa, boxb) {
  const ball = balls[0];
  let x_pose_a = boxa.Xposition;
  let y_pose_a = boxa.Yposition;
  let x_pose_b = boxb.Xposition;
  let y_pose_b = boxb.Yposition;

  // console.log(x_pose_a);
  if (
    (x_pose_a + boxa.width > x_pose_b &&
      x_pose_a < x_pose_b &&
      y_pose_a + boxa.height > y_pose_b &&
      y_pose_a < y_pose_b) ||
    (x_pose_b + boxb.width > x_pose_a &&
      x_pose_b < x_pose_a &&
      y_pose_b + boxb.height > y_pose_a &&
      y_pose_b < y_pose_a)
  ) {
    if (boxa.dx != boxb.dx && boxa.dy != boxb.dx) {
      boxa.collidedX();
      boxb.collidedX();
      return;
    }
    if (boxa.dy != boxb.dx) {
      boxa.collidedY();
      boxb.collidedY();
      return;
    }
    boxa.collidedX();
    boxb.collidedX();
    boxa.collidedY();
    boxb.collidedY();
  }

  requestAnimationFrame(() => {
    checkCollision(boxa, boxb);
  });
}

const balls = [];
for (let i = 0; i < 50; i++) {
  const ball = new Ball(i, 30, 30);
  ball.createAndMove();
  balls.push(ball);
}

balls.forEach((ball) => {
  console.log(ball);
  balls.forEach((ball2) => {
    console.log("ball 1 is ");
    console.log(ball.index);
    console.log(ball2.index);
    if (ball.index != ball2.index) {
      checkCollision(ball, ball2);
    }
  });
});
