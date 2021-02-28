export class Ball {
  x = 0;
  y = 0;
  radius = 2;
  color = '#ff6600';

  constructor(x = 0, y = 0, radius = 2, color = '#ff6600') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

export class IBall extends Ball {
  vx = 0;
  vy = 0;
  friction = 0.93;
  originalX = 0;
  originalY = 0;
  springFactor = 0.01;
  constructor(x = 0, y = 0, radius = 2, color = '#ff6600') {
    super(x, y, radius, color);
    this.originalX = x;
    this.originalY = y;
  }

  think(x: number, y: number, cursorRadius: number) {
    const dx = this.x - x;
    const dy = this.y - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // interaction
    if (dist < cursorRadius) {
      const angle = Math.atan2(dy, dx);
      const tx = x + Math.cos(angle) * 30;
      const ty = y + Math.sin(angle) * 30;

      this.vx += tx - this.x;
      this.vy += ty - this.y;
    }
    // spring factor
    const dx1 = -(this.x - this.originalX);
    const dy1 = -(this.y - this.originalY);

    this.vx += dx1 * this.springFactor;
    this.vy += dy1 * this.springFactor;
    // friction
    this.vx *= this.friction;
    this.vy *= this.friction;
    // action move
    this.x += this.vx;
    this.y += this.vy;
  }
}
