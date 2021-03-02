import { NgModule } from '@angular/core';
// components
import { SimpleBufferGeometryComponent } from './components/simple-buffer-geometry/simple-buffer-geometry.component';
import { ThreeParticleComponent } from './components/three-particle/three-particle.component';
import { TrainShaderComponent } from './components/train-shader/train-shader.component';
import { JellyEffectComponent } from './components/jelly-effect/jelly-effect.component';
import { TrainAnimationComponent } from './components/train-animation/train-animation.component';
import { TxtWaterRevealComponent } from './components/txt-water-reveal/txt-water-reveal.component';
import { LineDrawComponent } from './components/line-draw/line-draw.component';
@NgModule({
  imports: [],
  declarations: [
    SimpleBufferGeometryComponent,
    ThreeParticleComponent,
    TrainShaderComponent,
    JellyEffectComponent,
    TrainAnimationComponent,
    TxtWaterRevealComponent,
    LineDrawComponent,
  ],
  exports: [
    SimpleBufferGeometryComponent,
    ThreeParticleComponent,
    TrainShaderComponent,
    JellyEffectComponent,
    TrainAnimationComponent,
    TxtWaterRevealComponent,
    LineDrawComponent,
  ],
})
export class SharedModule {}
