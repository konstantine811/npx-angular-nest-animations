import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
// libs
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import * as Stats from 'stats-js';
import * as dat from 'dat.gui';

@Component({
  selector: 'app-brummer-learn-three-second',
  templateUrl: './learn-three-second.component.html',
  styleUrls: ['./learn-three-second.component.scss'],
})
export class LearnThreeSecondComponent implements OnInit, AfterViewInit {
  wrapEl: HTMLBaseElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  plane: THREE.Mesh;
  planeGeometry: THREE.BoxGeometry;
  stats: Stats;
  numberOfObjects: number;
  gui: dat;
  controls = {
    addCube: null,
    rotationSpeed: 0.02,
    numberOfObjects: null,
    removeCube: null,
    addCylinder: null,
    addSphere: null,
    addIcosahedron: null,
    addConvexShape: null,
    addLathe: null,
    addOctahedron: null,
    addTetrahedron: null,
    addTorus: null,
    addTorusKnot: null,
  };

  constructor(private el: ElementRef) {
    this.controls.addCube = this.addCube;
    this.controls.removeCube = this.removeCube;
    this.controls.addCylinder = this.addCylinder;
    this.controls.addSphere = this.addSphere;
    this.controls.addIcosahedron = this.addIcosahedron;
    this.controls.addConvexShape = this.createConvexShape;
    this.controls.addLathe = this.addLathe;
    this.controls.addOctahedron = this.addOctahedron;
    this.controls.addTetrahedron = this.addTetrahedron;
    this.controls.addTorus = this.addTorus;
    this.controls.addTorusKnot = this.addTorusKnot;
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(new THREE.Color(0xeeeeee));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene.fog = new THREE.FogExp2(0xffffff, 0.015);

    // black-white mode
    /*   this.scene.overrideMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
    }); */

    this.planeGeometry = new THREE.BoxGeometry(60, 40, 0.1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    this.plane = new THREE.Mesh(this.planeGeometry, planeMaterial);
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

    this.gui = new dat.GUI();
    this.controls.numberOfObjects = this.scene.children.length;
    this.gui.add(this.controls, 'addCube');
    this.gui.add(this.controls, 'removeCube');
    this.gui.add(this.controls, 'rotationSpeed', 0, 0.5);
    this.gui.add(this.controls, 'numberOfObjects').listen();
    this.gui.add(this.controls, 'addCylinder');
    this.gui.add(this.controls, 'addSphere');
    this.gui.add(this.controls, 'addIcosahedron');
    this.gui.add(this.controls, 'addConvexShape');
    this.gui.add(this.controls, 'addLathe');
    this.gui.add(this.controls, 'addOctahedron');
    this.gui.add(this.controls, 'addTetrahedron');
    this.gui.add(this.controls, 'addTorus');
    this.gui.add(this.controls, 'addTorusKnot');

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    this.initStats();
    this.anim();
  }

  anim = () => {
    requestAnimationFrame(this.anim);
    this.scene.traverse((e) => {
      if (e instanceof THREE.Mesh && e !== this.plane) {
        e.rotation.x += this.controls.rotationSpeed;
        e.rotation.y += this.controls.rotationSpeed;
        e.rotation.z += this.controls.rotationSpeed;
      }
    });
    this.stats.update();
    this.renderer.render(this.scene, this.camera);
  };

  initStats() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    this.wrapEl.appendChild(this.stats.domElement);
  }

  addMultiplyCube = () => {
    for (let i = 0; i <= 2000; i++) {
      this.addCube();
    }
  };

  addCube = () => {
    const cubeSize = Math.ceil(Math.random() * 3);
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = 'cube-' + this.scene.children.length;
    // position the cube randomly in the scene
    cube.position.x =
      -30 + Math.round(Math.random() * this.planeGeometry.parameters.width);
    cube.position.y = Math.round(Math.random() * 5);
    cube.position.z =
      -20 + Math.round(Math.random() * this.planeGeometry.parameters.height);

    this.scene.add(cube);
    this.controls.numberOfObjects = this.scene.children.length;
  };

  removeCube = () => {
    const allChildren = this.scene.children;
    const lastOfObject = allChildren[allChildren.length - 1];
    if (lastOfObject instanceof THREE.Mesh) {
      this.scene.remove(lastOfObject);
      this.controls.numberOfObjects = this.scene.children.length;
    }
  };

  addCylinder = () => {
    const cylinerGeom = new THREE.CylinderGeometry(1, 4, 4);
    this.defaultPropByGeom(cylinerGeom);
  };

  addSphere = () => {
    const sphereGeom = new THREE.SphereGeometry(2);
    this.defaultPropByGeom(sphereGeom);
  };

  addIcosahedron = () => {
    const icosahedron = new THREE.IcosahedronGeometry(4);
    this.defaultPropByGeom(icosahedron);
  };

  createConvexShape = () => {
    const points = [
      new THREE.Vector3(2, 2, 2),
      new THREE.Vector3(2, 2, -2),
      new THREE.Vector3(-2, 1, -2),
      new THREE.Vector3(-2, 2, 2),
      new THREE.Vector3(1, -2, 2),
      new THREE.Vector3(2, -2, -2),
      new THREE.Vector3(-2, -2, -2),
      new THREE.Vector3(-2, -2, 2),
    ];
    const convexGeom = new ConvexGeometry(points);
    this.defaultPropByGeom(convexGeom);
  };

  addLathe = () => {
    // points array - the path profile points will be stored here
    const pts = [];
    // half-circle detail - how many angle increments will be used to generate points
    const detail = 0.1;
    // radius for half_sphere
    const radius = 3;
    // loop from 0.0 radians to PI (0 - 180 degrees)
    for (let angle = 0.0; angle < Math.PI; angle += detail) {
      // angule/radius to x,z
      pts.push(
        new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
      );
    }
    const latheGeom = new THREE.LatheGeometry(pts, 12);
    this.defaultPropByGeom(latheGeom);
  };

  addOctahedron = () => {
    const octahedronGeom = new THREE.OctahedronGeometry(3);
    this.defaultPropByGeom(octahedronGeom);
  };

  addTetrahedron = () => {
    const tetrahedronGeom = new THREE.TetrahedronGeometry(3);
    this.defaultPropByGeom(tetrahedronGeom);
  };

  addTorus = () => {
    const torusGeom = new THREE.TorusGeometry(3, 1, 10, 10);
    this.defaultPropByGeom(torusGeom);
  };

  addTorusKnot = () => {
    const torusKnotGeom = new THREE.TorusKnotGeometry(3, 0.5, 50, 20);
    this.defaultPropByGeom(torusKnotGeom);
  };

  defaultPropByGeom(geom: THREE.Geometry) {
    const materials = this.crateMaterials();
    const mesh = SceneUtils.createMultiMaterialObject(geom, materials);
    mesh.traverse((e) => (e.castShadow = true));
    this.randomMeshPosition(mesh);
    this.scene.add(mesh);
    this.controls.numberOfObjects = this.scene.children.length;
  }

  crateMaterials() {
    return [
      new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff,
        flatShading: true,
      }),
      new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true }),
    ];
  }

  randomMeshPosition(mesh: THREE.Object3D) {
    mesh.position.x =
      -30 + Math.round(Math.random() * this.planeGeometry.parameters.width);
    mesh.position.y = 5;
    mesh.position.z =
      -20 + Math.round(Math.random() * this.planeGeometry.parameters.height);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.wrapEl = this.el.nativeElement;
    this.initScene();
  }
}
