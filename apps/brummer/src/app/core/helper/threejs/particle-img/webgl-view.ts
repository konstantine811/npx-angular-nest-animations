import * as THREE from 'three';
// helper class
import { Particle } from './particles/particle';
import { InteractiveControl } from '../controls/interactiveControls';

export class WebGLView {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;
  cube: THREE.Mesh;
  fovHeight: number;
  imagePath = './assets/images/own_face_polygon_3.png';
  interactive: InteractiveControl;
  particles: Particle;
  containerEl: HTMLBaseElement;
  containerWidth: number;
  containerHeight: number;

  constructor(containerEl: HTMLBaseElement) {
    this.containerEl = containerEl;
    this.containerWidth = containerEl.clientWidth;
    this.containerHeight = containerEl.clientHeight;
    this.initThree();
    this.initParticles();
    this.initControls();
  }

  private initThree() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.containerWidth / this.containerHeight,
      1,
      10000
    );
    this.camera.position.z = 700;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.containerWidth, this.containerHeight);
    this.clock = new THREE.Clock(true);
  }

  private initParticles() {
    this.particles = new Particle(this.imagePath, this);
    this.scene.add(this.particles.container);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }

  initControls() {
    this.interactive = new InteractiveControl(
      this.camera,
      this.renderer.domElement
    );
  }

  update() {
    const delta = this.clock.getDelta();
    if (this.particles) this.particles.update(delta);
  }

  resize() {
    if (!this.renderer) return;
    this.containerWidth = this.containerEl.clientWidth;
    this.containerHeight = this.containerEl.clientHeight;
    this.camera.aspect = this.containerWidth / this.containerHeight;
    this.camera.updateProjectionMatrix();
    this.fovHeight =
      2 *
      Math.tan((this.camera.fov * Math.PI) / 180 / 2) *
      this.camera.position.z;

    this.renderer.setSize(this.containerWidth, this.containerHeight);
    if (this.interactive) this.interactive.resize();
    if (this.particles) this.particles.resize();
  }
}
