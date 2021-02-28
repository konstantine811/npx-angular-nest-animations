import { AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventMouse } from '@app-brummer-core/helper/utils/events/event-mouse';
import { EventTouch } from '@app-brummer-core/helper/utils/events/event.touch';
import { Arrow } from '@app-brummer-core/helper/2d/train-anim/arrow';
import { Ball } from '@app-brummer-core/helper/2d/train-anim/ball';

export class TrainAnimationComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasEl') canvasEl: ElementRef;
  mouseCap: EventMouse;
  touchCap: EventTouch;
  arrow: Arrow;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  centerX: number;
  centerY: number;
  vx = 0;
  vy = 0;
  force = 0.05;

  constructor() {}

  animation() {
    requestAnimationFrame(this.animation.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const dx = this.mouseCap.mouse.x - this.arrow.x;
    const dy = this.mouseCap.mouse.y - this.arrow.y;
    const angle = Math.atan2(dy, dx);
    const ax = Math.cos(angle) * this.force;
    const ay = Math.sin(angle) * this.force;
    this.arrow.rotation = angle;
    this.vx += ax;
    this.vy += ay;
    this.arrow.x += this.vx;
    this.arrow.y += this.vy;
    this.arrow.draw(this.ctx);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = window.innerWidth / 2;
    this.canvas.height = window.innerHeight / 2;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.ctx = this.canvas.getContext('2d');
    this.mouseCap = new EventMouse(this.canvas);
    this.arrow = new Arrow(this.centerX, this.centerY);
    this.animation();
  }
}
