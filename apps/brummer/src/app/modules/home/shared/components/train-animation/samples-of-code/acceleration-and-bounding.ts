import { AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
// helpers
import { EventMouse } from '@app-brummer-core/helper/utils/events/event-mouse';
import { EventTouch } from '@app-brummer-core/helper/utils/events/event.touch';
import { Arrow } from '@app-brummer-core/helper/2d/train-anim/arrow';
import { Ball } from '@app-brummer-core/helper/2d/train-anim/ball';

class Init implements OnInit, AfterViewInit {
  @ViewChild('canvasEl') canvasEl: ElementRef;
  mouseCap: EventMouse;
  touchCap: EventTouch;
  arrow: Arrow;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  ball: Ball;
  centerX: number;
  centerY: number;
  circleRadius = 20;
  vx = 0;
  vy = 0;
  vr = 2;
  ax = 0;
  ay = 0;
  speed = 3;
  angle = 18;
  radians = (this.angle * Math.PI) / 180;

  constructor() {}

  animation() {
    requestAnimationFrame(this.animation.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.vx += this.ax;
    this.vy += this.ay;
    if (this.ball.x + this.circleRadius > this.canvas.width) {
      this.vx = -this.vx;
    } else if (this.ball.x - this.circleRadius < 0) {
      this.vx = -this.vx;
    } else if (this.ball.y + this.circleRadius > this.canvas.height) {
      this.vy = -this.vy;
    } else if (this.ball.y - this.circleRadius < 0) {
      this.vy = -this.vy;
    }
    this.ball.x += this.vx;
    this.ball.y += this.vy;
    this.ball.draw(this.ctx);
  }

  addListeners() {
    window.addEventListener('keydown', this.onKeydown, false);
    window.addEventListener('keyup', this.onKeyup, false);
  }

  onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      this.ax = -0.1;
    } else if (e.key === 'ArrowRight') {
      this.ax = 0.1;
    } else if (e.key === 'ArrowUp') {
      this.ay = -0.1;
    } else if (e.key === 'ArrowDown') {
      this.ay = 0.1;
    }
  };

  onKeyup = (e: KeyboardEvent) => {
    this.ax = 0;
    this.ay = 0;
  };

  ngOnInit() {}

  ngAfterViewInit() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = window.innerWidth / 2;
    this.canvas.height = window.innerHeight / 2;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.ctx = this.canvas.getContext('2d');
    this.mouseCap = new EventMouse(this.canvas);
    this.ball = new Ball(100, 100, this.circleRadius);
    this.addListeners();
    this.animation();
  }
}
