import * as THREE from 'three';

export class InitScene {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;

  constructor(
    fieldOfView: number,
    near: number,
    far: number,
    background: string | number
  ) {
    this.camera = new THREE.PerspectiveCamera(
      fieldOfView,
      window.innerWidth / window.innerHeight,
      near,
      far
    );
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(background);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    if (!this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
