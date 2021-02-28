import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from './shared/shared.module';
// components
import { BlogComponent } from './blog.component';

@NgModule({
  imports: [CommonModule, FormsModule, BlogRoutingModule, SharedModule],
  declarations: [BlogComponent],
  entryComponents: [BlogComponent],
})
export class BlogModule {}
