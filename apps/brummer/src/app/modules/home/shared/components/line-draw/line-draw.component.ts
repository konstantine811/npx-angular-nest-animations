import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
// utils
import {
  EventMouse,
  IMouseCoord,
} from '@app-brummer-core/helper/utils/events/event-mouse';

@Component({
  selector: 'app-brummer-line-draw',
  templateUrl: './line-draw.component.html',
  styleUrls: ['./line-draw.component.scss'],
})
export class LineDrawComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasEl') canvasEl: ElementRef;
  mouseCap: EventMouse;
  mouse: IMouseCoord;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor() {}

  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = window.innerWidth / 2;
    this.canvas.height = window.innerHeight / 2;
    this.ctx = this.canvas.getContext('2d');
    this.mouseCap = new EventMouse(this.canvas);
    this.mouse = this.mouseCap.mouse;
  }

  onMousemove(event: MouseEvent) {
    const x0 = 100;
    const y0 = 200;
    const x2 = 300;
    const y2 = 300;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const x1 = this.mouse.x;
    const y1 = this.mouse.y;
    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.quadraticCurveTo(x1, y1, x2, y2);
    this.ctx.stroke();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.initCanvas();
  }
}
