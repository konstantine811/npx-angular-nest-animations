export class Ship {
  x = 0;
  y = 0;
  width = 25;
  height = 20;
  rotation = 0;
  showFlame = false;

  construtor() {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, 10);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-10, -10);
    ctx.lineTo(10, 0);
    ctx.stroke();
    if (this.showFlame) {
      ctx.beginPath();
      ctx.moveTo(-7.5, -5);
      ctx.lineTo(-15, 0);
      ctx.lineTo(-7.5, 5);
      ctx.stroke();
    }
    ctx.restore();
  }
}
