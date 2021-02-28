export class Arrow {
  x = 0;
  y = 0;
  color = '#ffff00';
  rotation = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.lineWidth = 2;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(-50, -25);
    ctx.lineTo(0, -25);
    ctx.lineTo(0, -50);
    ctx.lineTo(50, 0);
    ctx.lineTo(0, 50);
    ctx.lineTo(0, 25);
    ctx.lineTo(-50, 25);
    ctx.lineTo(-50, -25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  arrowRotate(mouseX: number, mouseY: number, ctx: CanvasRenderingContext2D) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    this.rotation = Math.atan2(dy, dx); // radians
    this.draw(ctx);
  }
}
