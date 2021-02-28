import * as THREE from 'three';

export class SimpleBufferGeometry {
  mesh: THREE.Mesh;

  constructor() {
    const geometry = new THREE.BufferGeometry();
    const indices = [];

    const vertices = [];
    const normals = [];
    const colors = [];

    const size = 10;
    const segments = 10;

    const halfSize = size / 2;
    const segmentSize = size / segments;

    // genereate vertices, normas and color data for a simple grid geometry
    for (let i = 0; i <= segments; i++) {
      const y = i * segmentSize - halfSize;
      for (let j = 0; j <= segments; j++) {
        const x = j * segmentSize - halfSize;
        vertices.push(x, -y, 0);
        normals.push(0, 0, 1);

        const r = x / size + 0.5;
        const g = y / size + 0.5;
        colors.push(r, g, 1);
      }
    }

    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const a = i * (segments + 1) + (j + 1);
        const b = i * (segments + 1) + j;
        const c = (i + 1) * (segments + 1) + j;
        const d = (i + 1) * (segments + 1) + (j + 1);

        // generate tow faces (triangles) per iteration
        indices.push(a, b, d); // face one
        indices.push(b, c, d); // face two
      }
    }

    console.log(indices);

    geometry.setIndex(indices);
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute(
      'normal',
      new THREE.Float32BufferAttribute(normals, 3)
    );
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      vertexColors: true,
    });

    this.mesh = new THREE.Mesh(geometry, material);
  }
}
