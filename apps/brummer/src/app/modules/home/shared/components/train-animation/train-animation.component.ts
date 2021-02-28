import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EventMouse } from '@app-brummer-core/helper/utils/events/event-mouse';
import { EventTouch } from '@app-brummer-core/helper/utils/events/event.touch';
import { Ball } from '@app-brummer-core/helper/2d/train-anim/ball';

@Component({
  selector: 'app-brummer-train-animation',
  templateUrl: './train-animation.component.html',
  styleUrls: ['./train-animation.component.scss'],
})
export class TrainAnimationComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasEl') canvasEl: ElementRef;
  mouseCap: EventMouse;
  touchCap: EventTouch;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  ball: Ball;
  centerX: number;
  centerY: number;
  circleRadius = 7;
  numBalls = 180;
  balls = [];
  gravity = 0.5;

  constructor() {}

  createBalls() {
    for (let ball, i = 0; i < this.numBalls; i++) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      ball = new Ball(0, 0, this.circleRadius, `#${randomColor}`);
      ball.id = `ball-${i}`;
      ball.x = Math.random() * this.canvas.width;
      ball.y = this.canvas.height;
      ball.vx = Math.random() * 2 - 1;
      ball.vy = Math.random() * -10 - 10;
      this.balls.push(ball);
    }
  }

  draw(ball: Ball) {
    ball.vy += this.gravity;
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (
      ball.x - ball.radius > this.canvas.width ||
      ball.x + ball.radius < 0 ||
      ball.y - ball.radius > this.canvas.height ||
      ball.y + ball.radius < 0
    ) {
      ball.x = Math.random() * this.canvas.width;
      ball.y = this.canvas.height;
      ball.vx = Math.random() * 2 - 1;
      ball.vy = Math.random() * -10 - 10;
    }
    ball.draw(this.ctx);
  }

  animation() {
    requestAnimationFrame(this.animation.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.balls.forEach((item) => this.draw(item));
  }

  addListeners() {
    window.addEventListener('keydown', this.onKeydown, false);
    window.addEventListener('keyup', this.onKeyup, false);
  }

  onKeydown = (e: KeyboardEvent) => {};

  onKeyup = (e: KeyboardEvent) => {};

  ngOnInit() {}

  ngAfterViewInit() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = window.innerWidth / 2;
    this.canvas.height = window.innerHeight / 2;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.ctx = this.canvas.getContext('2d');
    this.mouseCap = new EventMouse(this.canvas);
    this.createBalls();
    this.addListeners();
    this.animation();
  }
}
