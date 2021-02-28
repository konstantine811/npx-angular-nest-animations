import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// modules
import { MaterialUiShareModule } from './material-ui/material-ui-share.module';
@NgModule({
  imports: [MaterialUiShareModule, CKEditorModule],
  exports: [MaterialUiShareModule, CKEditorModule],
})
export class SharedModule {}
