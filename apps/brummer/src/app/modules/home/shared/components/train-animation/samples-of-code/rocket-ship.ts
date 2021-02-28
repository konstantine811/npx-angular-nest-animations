import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EventMouse } from '@app-brummer-core/helper/utils/events/event-mouse';
import { EventTouch } from '@app-brummer-core/helper/utils/events/event.touch';
import { Ship } from '@app-brummer-core/helper/2d/train-anim/ship';

export class TrainAnimationComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasEl') canvasEl: ElementRef;
  mouseCap: EventMouse;
  touchCap: EventTouch;
  ship: Ship;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  centerX: number;
  centerY: number;
  vr = 0;
  vx = 0;
  vy = 0;
  thrust = 0;

  constructor() {}

  animation() {
    requestAnimationFrame(this.animation.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ship.rotation += (this.vr * Math.PI) / 180;
    const angle = this.ship.rotation;
    const ax = Math.cos(angle) * this.thrust;
    const ay = Math.sin(angle) * this.thrust;
    this.vx += ax;
    this.vy += ay;
    this.ship.x += this.vx;
    this.ship.y += this.vy;
    this.ship.draw(this.ctx);
  }

  addListener() {
    window.addEventListener('keydown', this.onKeydown, false);
    window.addEventListener('keyup', this.onKeyup, false);
  }

  onKeydown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 37:
        this.vr = -3;
        break;
      case 39:
        this.vr = 3;
        break;
      case 38:
        this.thrust = 0.05;
        this.ship.showFlame = true;
        break;
    }
  };

  onKeyup = () => {
    this.vr = 0;
    this.thrust = 0;
    this.ship.showFlame = false;
  };

  ngOnInit() {}

  ngAfterViewInit() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = window.innerWidth - 200;
    this.canvas.height = window.innerHeight / 2;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.ctx = this.canvas.getContext('2d');
    this.mouseCap = new EventMouse(this.canvas);
    this.ship = new Ship();
    this.ship.x = this.centerX;
    this.ship.y = this.centerY;
    this.addListener();
    this.animation();
  }
}
