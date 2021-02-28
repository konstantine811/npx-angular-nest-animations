import { Component, ElementRef, OnInit } from '@angular/core';
// libs
import * as THREE from 'three';
// three helpers
import { InitScene } from '@app-brummer-core/helper/threejs/init-scene';
import { SimpleBufferGeometry } from '@app-brummer-core/helper/threejs/simle-buffer-geometry';

@Component({
  selector: 'app-brummer-simple-buffer-geometry',
  templateUrl: './simple-buffer-geometry.component.html',
  styleUrls: ['./simple-buffer-geometry.component.scss'],
})
export class SimpleBufferGeometryComponent implements OnInit {
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private cube: THREE.Mesh;
  private initThree: InitScene;
  private bufferMesh: THREE.Mesh;

  constructor(private el: ElementRef) {
    this.initThree = new InitScene(27, 1, 3500, 0x0f00ff);
    this.camera = this.initThree.camera;
    this.scene = this.initThree.scene;
    this.renderer = this.initThree.renderer;
    this.camera.position.z = 64;
    // add
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    //add buffer geometry
    const buffer = new SimpleBufferGeometry();
    this.bufferMesh = buffer.mesh;
    this.scene.add(this.bufferMesh);
    const light = new THREE.HemisphereLight();
    this.scene.add(light);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.bufferMesh.rotation.x += 0.002;
    this.bufferMesh.rotation.y += 0.01;
    this.bufferMesh.rotation.z += 0.02;
    this.renderer.render(this.scene, this.camera);
  }

  ngOnInit() {}
}
