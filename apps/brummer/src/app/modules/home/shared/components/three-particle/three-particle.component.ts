import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
// services
import { WebGLView } from '@app-brummer-core/helper/threejs/particle-img/webgl-view';

@Component({
  selector: 'app-brummer-three-particle',
  templateUrl: './three-particle.component.html',
  styleUrls: ['./three-particle.component.scss'],
})
export class ThreeParticleComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  @HostBinding('style.height') height = '100%';
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.display') display = 'block';
  webgl: WebGLView;
  raf: number;
  handleAnimate: any;
  containerEl: HTMLBaseElement;

  constructor(private el: ElementRef) {}

  initWebGL() {
    this.webgl = new WebGLView(this.containerEl);
    this.rendererContainer.nativeElement.appendChild(
      this.webgl.renderer.domElement
    );
  }

  addListeners() {
    this.handleAnimate = this.animate.bind(this);

    window.addEventListener('resize', this.resize.bind(this));
  }

  animate() {
    this.update();
    this.draw();
    // run cycle animation
    this.raf = requestAnimationFrame(this.handleAnimate);
  }

  update() {
    this.webgl.update();
  }

  draw() {
    if (this.webgl) this.webgl.draw();
  }

  resize() {
    if (this.webgl) this.webgl.resize();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.containerEl = this.el.nativeElement;
    this.initWebGL();
    this.addListeners();
    this.animate();
    this.resize();
  }
}
