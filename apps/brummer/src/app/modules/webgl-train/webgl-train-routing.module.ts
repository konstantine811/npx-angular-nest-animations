import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebglTrainComponent } from './webgl-train.component';

const routes: Routes = [
  {
    path: '',
    component: WebglTrainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebglTrainRoutingModule {}
