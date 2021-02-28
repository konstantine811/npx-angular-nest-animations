// libs
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as Stats from 'stats-js';
import * as Physijs from 'physijs';
// @ts-ignore
import PhysiWorker from './physijs.worker.js';
import { Ammo } from 'physijs/lib/ammo';

export class InitPhysiScene {
  scene: Physijs.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  plane: THREE.Mesh;
  planeGeometry: THREE.BoxGeometry;
  stats: Stats;
  wrapEl: HTMLBaseElement;

  constructor(el: HTMLBaseElement, callback: Function) {
    this.wrapEl = el;
    console.log(PhysiWorker);
    console.log(Ammo);
    Physijs.scripts.worker = PhysiWorker;
    Physijs.scripts.ammo = Ammo;
    this.initScene(callback);
  }

  initScene(callback: Function) {
    console.log(Physijs);
    this.scene = new Physijs.Scene();
    this.scene.setGravity(new THREE.Vector3(0, -20, 0));

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(new THREE.Color(0xeeeeee));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.scene.add(this.camera);

    this.scene.fog = new THREE.FogExp2(0xffffff, 0.015);

    // add Ground
    this.planeGeometry = new THREE.BoxGeometry(60, 40, 0.1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    this.plane = new Physijs.PlaneMesh(this.planeGeometry, planeMaterial);
    this.plane.receiveShadow = true;
    this.plane.rotation.x = -0.5 * Math.PI;
    this.plane.position.x = 0;
    this.plane.position.y = 0;
    this.plane.position.z = 0;
    this.scene.add(this.plane);

    const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    this.scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    this.scene.add(spotLight);

    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 30;
    this.camera.lookAt(this.scene.position);

    this.renderer.shadowMap.enabled = true;
    this.camera.updateMatrixWorld();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.render(this.scene, this.camera);
    this.wrapEl.appendChild(this.renderer.domElement);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.initStats();
    this.anim(callback);
  }

  anim(callback: Function) {
    requestAnimationFrame(() => {
      callback();
      this.anim(callback);
    });
    this.stats.update();
    this.renderer.render(this.scene, this.camera);
    this.scene.simulate(undefined, 2);
  }

  initStats() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    this.wrapEl.appendChild(this.stats.domElement);
  }
}
