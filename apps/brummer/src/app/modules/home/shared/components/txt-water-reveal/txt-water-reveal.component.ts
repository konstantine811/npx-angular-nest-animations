import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brummer-txt-water-reveal',
  templateUrl: './txt-water-reveal.component.html',
  styleUrls: ['./txt-water-reveal.component.scss'],
})
export class TxtWaterRevealComponent implements OnInit {
  @Input() txt: string;
  constructor() {}

  ngOnInit() {}
}
