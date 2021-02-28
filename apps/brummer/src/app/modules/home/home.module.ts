import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
// modules
import { SharedModule } from './shared/shared.module';
// components
import { HomeComponent } from './home.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { HelloMainComponent } from './components/hello-main/hello-main.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  declarations: [HomeComponent, AboutMeComponent, HelloMainComponent],
})
export class HomeModule {}
