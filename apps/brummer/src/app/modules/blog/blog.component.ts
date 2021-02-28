import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-brummer-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public Editor = ClassicEditor;
  value: string;

  constructor() {
    this.Editor.defaultConfig = {
      toolbar: ['heading', '|', 'bold', 'italic', 'imageUpload'],
      image: {
        toolbar: [
          'imageTextAlternative',
          '|',
          'imageStyle:full',
          'imageStyle:side',
        ],
      },
    };
  }

  onClickBut() {
    console.log(this.value.split(' '));
  }

  onChange({ editor }: ChangeEvent) {
    const data = editor.getData();

    console.log(data);
  }

  ngOnInit() {
    console.log(new this.Editor());
  }
}
