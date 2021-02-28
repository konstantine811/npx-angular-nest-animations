import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
// helpers class
import { Ball, IBall } from '@app-brummer-core/helper/2d/ball';

@Component({
  selector: 'app-brummer-jelly-effect',
  templateUrl: './jelly-effect.component.html',
  styleUrls: ['./jelly-effect.component.scss'],
})
export class JellyEffectComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasEl: ElementRef;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  rect: DOMRect;
  mouseP = {
    x: 0,
    y: 0,
  };
  ball: Ball;
  balls: IBall[] = [];
  cursorRadius = 30;
  constructor() {}

  createContext() {
    this.canvas.width = window.innerWidth / 2;
    this.canvas.height = window.innerHeight / 2;
    this.ctx = this.canvasEl.nativeElement.getContext('2d');
  }

  mouseMove(e: MouseEvent) {
    this.mouseP.x = e.clientX - this.rect.left;
    this.mouseP.y = e.clientY - this.rect.top;
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ball.setPos(this.mouseP.x, this.mouseP.y);
    this.ball.draw(this.ctx);
    this.balls.forEach((ball) => {
      ball.think(this.mouseP.x, this.mouseP.y, this.cursorRadius);
      // ball.draw(this.ctx);
    });
    this.connectDots(this.balls);
  }

  connectDots(balls: Ball[]) {
    this.ctx.beginPath();
    this.ctx.moveTo(balls[0].x, balls[0].y);
    for (let i = 0, len = this.balls.length; i <= len; ++i) {
      const p0 = this.balls[i + 0 >= len ? i + 0 - len : i + 0];
      const p1 = this.balls[i + 1 >= len ? i + 1 - len : i + 1];
      this.ctx.quadraticCurveTo(
        p0.x,
        p0.y,
        (p0.x + p1.x) * 0.5,
        (p0.y + p1.y) * 0.5
      );
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.canvas = this.canvasEl.nativeElement;
    this.rect = this.canvas.getBoundingClientRect();
    this.createContext();
    this.ball = new Ball(0, 0, this.cursorRadius, '#ffcc00');
    this.ball.draw(this.ctx);
    const countParticle = 50;
    for (let i = 0; i < countParticle; i++) {
      this.balls.push(
        new IBall(
          200 + 100 * Math.cos((i * 2 * Math.PI) / countParticle),
          200 + 100 * Math.sin((i * 2 * Math.PI) / countParticle)
        )
      );
    }
    this.canvas.onmousemove = this.mouseMove.bind(this);
    this.render();
  }
}
