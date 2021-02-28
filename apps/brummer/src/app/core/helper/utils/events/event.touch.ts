export class EventTouch {
  private el: HTMLElement;
  private _touch = {
    x: null,
    y: null,
    isPressed: false,
  };

  constructor(el: HTMLElement) {
    this.el = el;
    this.el.addEventListener(
      'touchstart',
      (e) => {
        this._touch.isPressed = true;
      },
      false
    );
    this.el.addEventListener(
      'touchend',
      (e) => {
        this._touch.isPressed = false;
        this._touch.x = null;
        this._touch.y = null;
      },
      false
    );
    this.el.addEventListener('touchmove', this.onTouchmove.bind(this), false);
  }

  get touch() {
    return this._touch;
  }

  onTouchmove(e: TouchEvent) {
    let x, y;
    const touch_event = e.touches[0]; // first touch
    if (touch_event.pageX || touch_event.pageY) {
      x = touch_event.pageX;
      y = touch_event.pageY;
    } else {
      x =
        touch_event.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      y =
        touch_event.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    x -= this.el.offsetLeft;
    y -= this.el.offsetTop;
    this._touch.x = x;
    this._touch.y = y;
  }
}
