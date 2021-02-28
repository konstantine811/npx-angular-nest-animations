export class Ball {
  radius: number;
  color: string;
  x: number;
  y: number;
  rotation = 0;
  scaleX = 1;
  scaleY = 1;
  lineWidth = 1;
  vx = 0;
  vy = 0;
  id: string;

  constructor(x = 0, y = 0, radius = 40, color = '#ff0000') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // x, y, radius, start_angle, end_angle, anti-clockwise
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    if (this.lineWidth > 0) {
      ctx.stroke();
    }
    ctx.restore();
  }
}
