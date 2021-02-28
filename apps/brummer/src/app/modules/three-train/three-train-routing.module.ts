import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThreeTrainComponent } from './three-train.component';

const routes: Routes = [
  {
    path: '',
    component: ThreeTrainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeTrainRoutingModule {}
