import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-brummer-hello-main',
  templateUrl: './hello-main.component.html',
  styleUrls: ['./hello-main.component.scss'],
})
export class HelloMainComponent implements OnInit, AfterViewInit {
  @ViewChild('txtTitle') refTxtTitle: ElementRef;
  elTxt: HTMLBaseElement;
  txtStyles: any;
  constructor() {}

  ngOnInit() {}

  getCenterTxt() {
    if (this.elTxt) {
      return {
        left: `calc(50% - ${
          this.elTxt.getBoundingClientRect().width / 2 - 50
        }px)`,
      };
    } else {
      return { visibility: 'hidden' };
    }
  }

  ngAfterViewInit() {
    this.elTxt = this.refTxtTitle.nativeElement;
  }
}
