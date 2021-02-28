import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
// libs
import * as THREE from 'three';
import * as Stats from 'stats-js';
import * as dat from 'dat.gui';
@Component({
  selector: 'app-brummer-learn-three-anim',
  templateUrl: './learn-three-anim.component.html',
  styleUrls: ['./learn-three-anim.component.scss'],
})
export class LearnThreeAnimComponent implements OnInit, AfterViewInit {
  wrapEl: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  sphere: THREE.Mesh;
  cube: THREE.Mesh;
  stats: Stats;
  step = 0;
  dat: dat.GUI;
  controls = {
    rotationSpeed: 0.02,
    bouncingSpeed: 0.03,
  };

  constructor(private el: ElementRef) {}

  initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xeeeeee, 1.0);
    this.renderer.shadowMap.enabled = true;

    const axes = new THREE.AxesHelper(20);
    this.scene.add(axes);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;

    this.scene.add(spotLight);

    const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    this.scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000,
    });
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.cube.castShadow = true;
    this.cube.position.x = -4;
    this.cube.position.y = 3;
    this.cube.position.z = 0;
    this.scene.add(this.cube);

    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0x7777ff,
    });
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.sphere.castShadow = true;
    this.sphere.position.x = 20;
    this.sphere.position.y = 4;
    this.sphere.position.z = 2;
    this.scene.add(this.sphere);

    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 30;
    this.camera.lookAt(this.scene.position);

    this.wrapEl.appendChild(this.renderer.domElement);
    this.renderer.render(this.scene, this.camera);
    this.dat = new dat.GUI();
    this.dat.add(this.controls, 'rotationSpeed', 0, 0.5);
    this.dat.add(this.controls, 'bouncingSpeed', 0, 0.5);
    this.initStats();
    this.renderScene();
  }

  private renderScene = () => {
    requestAnimationFrame(this.renderScene);
    this.step += this.controls.bouncingSpeed;
    this.renderer.render(this.scene, this.camera);
    // animate mesh
    this.cube.rotation.x += this.controls.rotationSpeed;
    this.cube.rotation.y += this.controls.rotationSpeed;
    this.cube.rotation.z += this.controls.rotationSpeed;
    // sphere
    this.sphere.position.x = 20 + 10 * Math.cos(this.step);
    this.sphere.position.y = 5 + 10 * Math.abs(Math.sin(this.step));
    // end animate mesh
    this.stats.update();
  };

  initStats() {
    this.stats = new Stats();
    this.stats.showPanel(1);
    document.body.appendChild(this.stats.dom);
    this.wrapEl.appendChild(this.stats.domElement);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.wrapEl = this.el.nativeElement;
    this.initScene();
  }
}
