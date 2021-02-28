import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebglTrainRoutingModule } from './webgl-train-routing.module';
// components
import { WebglTrainComponent } from './webgl-train.component';
import { WebglInitComponent } from './components/webgl-init/webgl-init.component';

@NgModule({
  imports: [CommonModule, WebglTrainRoutingModule],
  declarations: [WebglTrainComponent, WebglInitComponent],
})
export class WebglTrainModule {}
