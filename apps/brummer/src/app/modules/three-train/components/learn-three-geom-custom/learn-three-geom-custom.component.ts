import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
// libs
import * as THREE from 'three';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';
import * as Physi from 'physijs';
import * as dat from 'dat.gui';
// helpers
import { InitPhysiScene } from '../../helpers/init-physi-scene';

@Component({
  selector: 'app-brummer-learn-three-geom-custom',
  templateUrl: './learn-three-geom-custom.component.html',
  styleUrls: ['./learn-three-geom-custom.component.scss'],
})
export class LearnThreeGeomCustomComponent implements OnInit, AfterViewInit {
  wrapEl: HTMLBaseElement;
  init: InitPhysiScene;
  gui: dat;
  controlPoints: [
    {
      x: number;
      y: number;
      z: number;
    }
  ];
  mesh: THREE.Group;
  vertices = [
    [1, 3, 1],
    [1, 3, -1],
    [1, -1, 1],
    [1, -1, -1],
    [-1, 3, -1],
    [-1, 3, 1],
    [-1, -1, -1],
    [-1, -1, 1],
  ];

  controls = {
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    positionX: 0,
    positionY: 1.2,
    positionZ: 0,
    visible: true,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
  };

  constructor(private el: ElementRef) {}

  addObjectToScene() {
    const vertices = [];
    for (let i = 0; i < this.vertices.length; i++) {
      vertices.push(
        new THREE.Vector3(
          this.vertices[i][0],
          this.vertices[i][1],
          this.vertices[i][2]
        )
      );
      if (!this.controlPoints) {
        this.controlPoints = [
          this.addControlPoint(
            this.vertices[i][0],
            this.vertices[i][1],
            this.vertices[i][2]
          ),
        ];
      } else {
        this.controlPoints.push(
          this.addControlPoint(
            this.vertices[i][0],
            this.vertices[i][1],
            this.vertices[i][2]
          )
        );
      }
      const f1 = this.gui.addFolder('Vertices-' + i + 1);
      f1.add(this.controlPoints[i], 'x', -10, 10);
      f1.add(this.controlPoints[i], 'y', -10, 10);
      f1.add(this.controlPoints[i], 'z', -10, 10);
    }
    const facesArr = [
      [0, 2, 1],
      [2, 3, 1],
      [4, 6, 5],
      [6, 7, 5],
      [4, 5, 1],
      [5, 0, 1],
      [7, 6, 2],
      [6, 3, 2],
      [5, 7, 0],
      [7, 2, 0],
      [1, 3, 4],
      [3, 6, 4],
    ];
    const faces = facesArr.map(
      (item) => new THREE.Face3(item[0], item[1], item[2])
    );
    const geom = new THREE.Geometry();
    geom.vertices = vertices;
    geom.faces = faces;
    geom.computeFaceNormals();
    const materials = [
      new THREE.MeshLambertMaterial({
        opacity: 0.6,
        color: 0x44ff44,
        transparent: true,
      }),
      new THREE.MeshBasicMaterial({ color: 0x330000, wireframe: true }),
    ];
    this.mesh = SceneUtils.createMultiMaterialObject(geom, materials);
    this.mesh.children.forEach((e) => {
      e.castShadow = true;
    });
    this.mesh.position.set(
      this.controls.positionX,
      this.controls.positionY,
      this.controls.positionZ
    );
    this.init.scene.add(this.mesh);
  }

  cloneGeom = () => {
    const objectF = this.mesh.children[0] as THREE.Mesh;
    const clone = objectF.geometry.clone() as THREE.Geometry;
    const materials = [
      new THREE.MeshLambertMaterial({
        opacity: 0.6,
        color: 0xff44ff,
        transparent: true,
      }),
      new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true }),
    ];
    const mesh = SceneUtils.createMultiMaterialObject(clone, materials);
    mesh.children.forEach((e) => {
      e.castShadow = true;
    });
    mesh.translateX(5);
    mesh.translateZ(5);
    mesh.translateY(2);
    mesh.name = 'clone';
    this.init.scene.remove(this.init.scene.getObjectByName('clone'));
    this.init.scene.add(mesh);
  };

  renderFun() {
    const vertices = [];
    this.controlPoints.forEach((item) => {
      vertices.push(new THREE.Vector3(item.x, item.y, item.z));
    });
    this.mesh.children.forEach((e: THREE.Mesh, i) => {
      const geom = e.geometry as THREE.Geometry;
      geom.vertices = vertices;
      geom.verticesNeedUpdate = true;
      geom.elementsNeedUpdate = true;
      geom.computeFaceNormals();
    });
    this.mesh.scale.set(
      this.controls.scaleX,
      this.controls.scaleY,
      this.controls.scaleZ
    );
    /*  this.mesh.position.set(
      this.controls.positionX,
      this.controls.positionY,
      this.controls.positionZ
    ); */
    this.mesh.translateX(this.controls.translateX);
    this.mesh.visible = this.controls.visible;
  }

  addControlPoint(x: number, y: number, z: number) {
    return { x, y, z };
  }

  addControlsChangeMesh() {
    this.addScaleFolder();
    this.addPositionFolder();
    this.addTranslateFolder();
    this.gui.add(this.controls, 'visible');
  }

  addScaleFolder() {
    const guiScale = this.gui.addFolder('scale');
    guiScale.add(this.controls, 'scaleX', 0, 5);
    guiScale.add(this.controls, 'scaleY', 0, 5);
    guiScale.add(this.controls, 'scaleZ', 0, 5);
  }

  addPositionFolder() {
    const guiPosition = this.gui.addFolder('position');
    const contX = guiPosition.add(this.controls, 'positionX', -10, 10);
    const contY = guiPosition.add(this.controls, 'positionY', -10, 10);
    const contZ = guiPosition.add(this.controls, 'positionZ', -10, 10);
    contX.onChange((value) => {
      this.mesh.position.x = value;
    });
    contY.onChange((value) => {
      this.mesh.position.y = value;
    });
    contZ.onChange((value) => {
      this.mesh.position.z = value;
    });
  }

  addTranslateFolder() {
    const guiTranslate = this.gui.addFolder('translate');
    const guiTranslateX = guiTranslate.add(
      this.controls,
      'translateX',
      -10,
      10
    );
    /* guiTranslateX.onChange((value) => {
      this.mesh.translateX(value);
    }); */
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.wrapEl = this.el.nativeElement;
    this.init = new InitPhysiScene(this.wrapEl, this.renderFun.bind(this));
    /* this.gui = new dat.GUI();
    this.addObjectToScene();
    this.gui.add({ clone: this.cloneGeom }, 'clone');
    this.addControlsChangeMesh(); */
  }
}
