import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'blog',
        loadChildren: () =>
          import('./modules/blog/blog.module').then((m) => m.BlogModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'webgl-train',
        loadChildren: () =>
          import('./modules/webgl-train/webgl-train.module').then(
            (m) => m.WebglTrainModule
          ),
      },
      {
        path: 'three-train',
        loadChildren: () =>
          import('./modules/three-train/three-train.module').then(
            (m) => m.ThreeTrainModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
