export interface IMouseCoord {
  x: number;
  y: number;
}


export class EventMouse {
  private el: HTMLElement;
  private _mouse: IMouseCoord  = {
    x: 0,
    y: 0,
  };
  constructor(el: HTMLElement) {
    this.el = el;
    el.addEventListener('mousemove', this.onMousemove.bind(this), false);
  }

  get mouse() {
    return this._mouse;
  }

  private onMousemove(e: MouseEvent) {
    let x, y;
    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    } else {
      x =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      y =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    x -= this.el.offsetLeft;
    y -= this.el.offsetTop;

    this._mouse.x = x;
    this._mouse.y = y;
  }
}
