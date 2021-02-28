import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
//@ts-ignore
import * as VSHADER from './shaders/simple.vs';
//@ts-ignore
import * as FSHADER from './shaders/simple.fs';
@Component({
  selector: 'app-brummer-webgl-init',
  templateUrl: './webgl-init.component.html',
  styleUrls: ['./webgl-init.component.scss'],
})
export class WebglInitComponent implements OnInit, AfterViewInit {
  @ViewChild('mycanvas') refMyCanvas: ElementRef;
  elMyCanvas: HTMLCanvasElement;
  constructor() {}

  styleContainer() {
    this.elMyCanvas.style.border = '1px solid red';
  }

  initWebGL() {
    // step 1: prepare the canvas and get webgl context
    const gl = this.elMyCanvas.getContext('webgl2');
    // step 2: define the geometry and store it in buffer objects
    const vertices = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5];
    // Create a new buffer object
    const vertex_buffer = gl.createBuffer();
    // Bind an empty array buffer to it
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Pass the vertices data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // step 3: create and compile shader programs
    // create a vertex shader object
    const vertShader = gl.createShader(gl.VERTEX_SHADER);
    // attach vertex shader source code
    gl.shaderSource(vertShader, VSHADER);
    // compile the vertex shader
    gl.compileShader(vertShader);

    // create fragment shader object
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // attach fragment shader source code
    gl.shaderSource(fragShader, FSHADER);
    // compile the fragment shader
    gl.compileShader(fragShader);

    // create a shader program object to store combined shader program
    const shaderProgram = gl.createProgram();
    // attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // link both programs
    gl.linkProgram(shaderProgram);
    // use the combined shader program object
    gl.useProgram(shaderProgram);

    // step 4: associate the shader programs to buffer objects
    // bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // get the attribute location
    const coord = gl.getAttribLocation(shaderProgram, 'coordinates');
    // point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    // enable the attribute
    gl.enableVertexAttribArray(coord);

    // step 5: drawing the required object (triangle)
    // clear the canvas
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // enable the depth test
    gl.enable(gl.DEPTH_TEST);
    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);
    // set the view port
    gl.viewport(0, 0, this.elMyCanvas.width, this.elMyCanvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.elMyCanvas = this.refMyCanvas.nativeElement;
    this.styleContainer();
    this.initWebGL();
  }
}
