import * as THREE from 'three';
import { TweenLite } from 'gsap';
// shaders
// @ts-ignore
import FSHADER_SOURCE from '@app-brummer-core/shaders/particles/particle.glsl.fs';
// @ts-ignore
import VSHADER_SOURCE from '@app-brummer-core/shaders/particles/particle.glsl.vs';
// helpers
import { TouchTexture } from './touchTexture';
import { WebGLView } from '../webgl-view';

export class Particle {
  container = new THREE.Object3D();
  texture: THREE.Texture;
  width: number;
  height: number;
  numPoints: number;
  object3D: THREE.Mesh;
  hitArea: THREE.Mesh;
  touch: TouchTexture;
  webGL: WebGLView;

  constructor(src: string, webGL: WebGLView) {
    this.init(src);
    this.webGL = webGL;
  }

  init(src: string) {
    const loader = new THREE.TextureLoader();

    loader.load(src, (texture) => {
      this.texture = texture;
      this.texture.minFilter = THREE.LinearFilter;
      this.texture.magFilter = THREE.LinearFilter;
      this.texture.format = THREE.RGBFormat;

      this.width = texture.image.width;
      this.height = texture.image.height;

      this.initPoints(true);
      this.initHitArea();
      this.initTouch();
      this.show();
      this.resize();
    });

    return this;
  }

  initPoints(discard: boolean) {
    this.numPoints = this.width * this.height;
    let numVisible = this.numPoints;
    let threshold = 0;
    let originalColors;

    if (discard) {
      // discard pixels darker than threshold #22;
      numVisible = 0;
      threshold = 34;

      const img = this.texture.image;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = this.width;
      canvas.height = this.height;
      ctx.scale(1, -1);
      ctx.drawImage(img, 0, 0, this.width, this.height * -1);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      originalColors = Float32Array.from(imgData.data);

      for (let i = 0; i < this.numPoints; i++) {
        if (originalColors[i * 4 + 0] > threshold) numVisible++;
      }
    }

    const uniforms = {
      uTime: { value: 0 },
      uRandom: { value: 1.0 },
      uDepth: { value: 2.0 },
      uSize: { value: 0.0 },
      uTextureSize: { value: new THREE.Vector2(this.width, this.height) },
      uTexture: { value: this.texture },
      uTouch: { value: null },
    };

    const material = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader: VSHADER_SOURCE,
      fragmentShader: FSHADER_SOURCE,
      depthTest: false,
      transparent: true,
    });

    const geometry = new THREE.InstancedBufferGeometry();

    // positinos
    const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
    positions.setXYZ(0, -0.5, 0.5, 0.0);
    positions.setXYZ(1, 0.5, 0.5, 0.0);
    positions.setXYZ(2, -0.5, -0.5, 0.0);
    positions.setXYZ(3, 0.5, -0.5, 0.0);
    geometry.setAttribute('position', positions);

    // uvs
    const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
    uvs.setXYZ(0, 0.0, 0.0, 1.0);
    uvs.setXYZ(1, 1.0, 0.0, 1.0);
    uvs.setXYZ(2, 0.0, 1.0, 1.0);
    uvs.setXYZ(3, 1.0, 1.0, 1.0);
    geometry.setAttribute('uv', uvs);

    geometry.setIndex(
      new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1)
    );

    const indices = new Uint16Array(numVisible);
    const offsets = new Float32Array(numVisible * 3);
    const angles = new Float32Array(numVisible);

    for (let i = 0, j = 0; i < this.numPoints; i++) {
      if (discard && originalColors[i * 4 + 0] <= threshold) continue;
      offsets[j * 3 + 0] = i % this.width;
      offsets[j * 3 + 1] = Math.floor(i / this.width);

      indices[j] = i;
      angles[j] = Math.random() * Math.PI;

      j++;
    }

    geometry.setAttribute(
      'pindex',
      new THREE.InstancedBufferAttribute(indices, 1, false)
    );
    geometry.setAttribute(
      'offset',
      new THREE.InstancedBufferAttribute(offsets, 3, false)
    );
    geometry.setAttribute(
      'angle',
      new THREE.InstancedBufferAttribute(angles, 1, false)
    );

    this.object3D = new THREE.Mesh(geometry, material);
    this.container.add(this.object3D);
  }

  initHitArea() {
    const geometry = new THREE.PlaneGeometry(this.width, this.height, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      depthTest: false,
    });
    material.visible = false;
    this.hitArea = new THREE.Mesh(geometry, material);
    this.container.add(this.hitArea);
  }

  initTouch() {
    if (!this.touch) this.touch = new TouchTexture();
    const materail = this.object3D.material as THREE.RawShaderMaterial;
    materail.uniforms.uTouch.value = this.touch.texture;
  }

  update(delta: number) {
    if (!this.object3D) return;
    if (this.touch) this.touch.update();

    const materail = this.object3D.material as THREE.RawShaderMaterial;
    materail.uniforms.uTime.value += delta;
  }

  addListeners() {
    this.webGL.interactive.interactiveMove$.subscribe((res) => {
      this.onInteractiveMove(res);
    });
    this.webGL.interactive.objects.push(this.hitArea);
    this.webGL.interactive.enable();
  }

  show(time = 1.0) {
    const materail = this.object3D.material as THREE.RawShaderMaterial;
    TweenLite.fromTo(
      materail.uniforms.uSize,
      time * 5,
      { value: 0.001 },
      { value: 1.5 }
    );
    TweenLite.fromTo(
      materail.uniforms.uRandom,
      time * 5,
      { value: 4000.0 },
      { value: 0.0 }
    );
    TweenLite.fromTo(
      materail.uniforms.uDepth,
      time * 4,
      { value: 14200.0 },
      { value: 0.0 }
    );
    this.addListeners();
  }

  resize() {
    if (!this.object3D) return;
    const scale = this.webGL.fovHeight / this.height;
    this.object3D.scale.set(scale, scale, 1);
    this.hitArea.scale.set(scale, scale, 1);
  }

  onInteractiveMove(e) {
    const uv = e.intersectionData.uv;
    if (this.touch) this.touch.addTouch(uv);
  }
}
