import * as THREE from 'three';
import { Subject } from 'rxjs';
import browser from 'browser-detect';
import { BrowserDetectInfo } from 'browser-detect/dist/types/browser-detect.interface';
// utils
import { passiveEvent } from '../../utils/event.utils';

export class InteractiveControl {
  interactiveOut$: Subject<THREE.Object3D> = new Subject();
  interactiveUp$: Subject<THREE.Object3D> = new Subject();
  interactiveOver$: Subject<THREE.Object3D> = new Subject();
  interactiveMove$: Subject<{
    object: THREE.Object3D;
    intersectionData: THREE.Intersection;
  }> = new Subject();
  interactiveDown$: Subject<{
    object: THREE.Object3D;
    previous: THREE.Object3D;
    intersectionData: THREE.Intersection;
  }> = new Subject();
  camera: THREE.PerspectiveCamera;
  el: HTMLElement;
  plane: THREE.Plane;
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  offset: THREE.Vector3;
  intersection: THREE.Vector3;
  objects: any[];
  hovered: THREE.Object3D;
  selected: THREE.Object3D;
  isDown: boolean;
  browser: BrowserDetectInfo;
  private _enabled: boolean;
  handlerDown: any;
  handlerMove: any;
  handlerUp: any;
  handlerLeave: any;
  rect: { x: number; y: number; width: number; height: number };
  intersectionData: THREE.Intersection;

  set enabled(state: boolean) {
    this._enabled = state;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  constructor(camera: THREE.PerspectiveCamera, el: HTMLElement) {
    this.camera = camera;
    this.el = el;

    this.plane = new THREE.Plane();
    this.raycaster = new THREE.Raycaster();

    this.mouse = new THREE.Vector2();
    this.offset = new THREE.Vector3();
    this.intersection = new THREE.Vector3();

    this.objects = [];
    this.hovered = null;
    this.selected = null;

    this.isDown = false;
    this.browser = browser();
    this.enable();
  }

  enable() {
    if (this.enabled) return;
    this.addListeners();
    this.enabled = true;
  }

  disable() {
    if (!this.enabled) return;
    this.removeListeners();
    this.enabled = false;
  }

  addListeners() {
    this.handlerDown = this.onDown.bind(this);
    this.handlerMove = this.onMove.bind(this);
    this.handlerUp = this.onUp.bind(this);
    this.handlerLeave = this.onLeave.bind(this);

    if (this.browser.mobile) {
      this.el.addEventListener('touchstart', this.handlerDown, passiveEvent());
      this.el.addEventListener('touchmove', this.handlerMove, passiveEvent());
      this.el.addEventListener('touchend', this.handlerUp, passiveEvent());
    } else {
      this.el.addEventListener('mousedown', this.handlerDown);
      this.el.addEventListener('mousemove', this.handlerMove);
      this.el.addEventListener('mouseup', this.handlerUp);
      this.el.addEventListener('mouseleave', this.handlerLeave);
    }
  }

  removeListeners() {
    if (this.browser.mobile) {
      this.el.removeEventListener('touchstart', this.handlerDown);
      this.el.removeEventListener('touchmove', this.handlerMove);
      this.el.removeEventListener('touchend', this.handlerUp);
    } else {
      this.el.removeEventListener('mousedown', this.handlerDown);
      this.el.removeEventListener('mousemove', this.handlerMove);
      this.el.removeEventListener('mouseup', this.handlerUp);
      this.el.removeEventListener('mouseleave', this.handlerLeave);
    }
  }

  resize(): void {
    this.rect = this.el.getBoundingClientRect();
  }

  onMove(e) {
    const t = e.touches ? e.touches[0] : e;
    const touch = { x: t.offsetX, y: t.offsetY };
    this.mouse.x = ((touch.x + this.rect.x) / this.rect.width) * 2 - 1;
    this.mouse.y = -((touch.y + this.rect.y) / this.rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this.objects);
    if (intersects.length > 0) {
      const object = intersects[0].object;
      this.intersectionData = intersects[0];
      this.plane.setFromNormalAndCoplanarPoint(
        this.camera.getWorldDirection(this.plane.normal),
        object.position
      );

      if (this.hovered !== object) {
        this.interactiveOut$.next(this.hovered);
        this.interactiveOver$.next(object);
        this.hovered = object;
      } else {
        this.interactiveMove$.next({
          object,
          intersectionData: this.intersectionData,
        });
      }
    } else {
      this.intersectionData = null;
      if (this.hovered !== null) {
        this.interactiveOut$.next(this.hovered);
        this.hovered = null;
      }
    }
  }

  onDown(e) {
    this.isDown = true;
    this.onMove(e);
    this.interactiveDown$.next({
      object: this.hovered,
      previous: this.selected,
      intersectionData: this.intersectionData,
    });
    this.selected = this.hovered;

    if (this.selected) {
      if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
        this.offset.copy(this.intersection).sub(this.selected.position);
      }
    }
  }

  onUp(e) {
    this.isDown = false;
    this.interactiveUp$.next(this.hovered);
  }

  onLeave(e) {
    this.onUp(e);
    this.interactiveOut$.next(this.hovered);
    this.hovered = null;
  }
}
