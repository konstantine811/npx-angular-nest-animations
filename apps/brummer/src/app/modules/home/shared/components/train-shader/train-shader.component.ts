import { Component, ElementRef, OnInit } from '@angular/core';
import * as THREE from 'three';
// @ts-ignore
import VS_SHADER from '@app-brummer-core/shaders/practic/lesson1/first.glsl.vs';
// @ts-ignore
import FS_SHADER from '@app-brummer-core/shaders/practic/lesson1/first.glsl.fs';

interface IResolution {
  x: number;
  y: number;
}

@Component({
  selector: 'app-brummer-train-shader',
  templateUrl: './train-shader.component.html',
  styleUrls: ['./train-shader.component.scss'],
})
export class TrainShaderComponent implements OnInit {
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  uniforms: any;
  clock: THREE.Clock;

  constructor(private el: ElementRef) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    el.nativeElement.appendChild(this.renderer.domElement);
    this.clock = new THREE.Clock();
    const geometry = new THREE.PlaneGeometry(2, 2);
    this.uniforms = {
      u_time: { value: 0.0 },
      u_mouse: { value: { x: 0.0, y: 0.0 } },
      u_resolution: { value: { x: 0.0, y: 0.0 } },
      u_color: { value: new THREE.Color(0x0044ff) },
    };
    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: VS_SHADER,
      fragmentShader: FS_SHADER,
    });
    const plane = new THREE.Mesh(geometry, material);
    this.scene.add(plane);
    this.camera.position.z = 1;

    this.animate();
    this.resize();
    if ('outouchstart' in window) {
      document.addEventListener('touchmove', this.move.bind(this));
    } else {
      window.addEventListener('resize', this.resize.bind(this));
      document.addEventListener('mousemove', this.move.bind(this));
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.uniforms.u_time.value = this.clock.getElapsedTime();
  }

  move(evt) {
    this.uniforms.u_mouse.value.x = evt.touches
      ? evt.touches[0].clientX
      : evt.clientX;
    this.uniforms.u_mouse.value.y = evt.touches
      ? evt.touches[0].clientY
      : evt.clientY;
  }

  resize() {
    if (!this.renderer) return;
    const aspectRatio = window.innerWidth / window.innerHeight;
    let width, height;
    if (aspectRatio >= 1) {
      width = 1;
      height = (window.innerHeight / window.innerWidth) * width;
    } else {
      width = aspectRatio;
      height = 1;
    }
    this.camera.left = -width;
    this.camera.right = width;
    this.camera.top = height;
    this.camera.bottom = -height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (this.uniforms.u_resolution !== undefined) {
      this.uniforms.u_resolution.value.x = window.innerWidth;
      this.uniforms.u_resolution.value.y = window.innerHeight;
    }
  }

  ngOnInit() {}
}
