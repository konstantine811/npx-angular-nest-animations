import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeTrainRoutingModule } from './three-train-routing.module';
// components
import { ThreeTrainComponent } from './three-train.component';
import { LearnThreeAnimComponent } from './components/learn-three-anim/learn-three-anim.component';
import { LearnThreeGeomCustomComponent } from './components/learn-three-geom-custom/learn-three-geom-custom.component';
import { LearnThreeSecondComponent } from './components/learn-three-second/learn-three-second.component';

@NgModule({
  imports: [CommonModule, ThreeTrainRoutingModule],
  declarations: [
    ThreeTrainComponent,
    LearnThreeAnimComponent,
    LearnThreeGeomCustomComponent,
    LearnThreeSecondComponent,
  ],
})
export class ThreeTrainModule {}
