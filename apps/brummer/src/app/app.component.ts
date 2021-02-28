import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-brummer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('style.height') height = '100%';
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.display') display = 'block';

  constructor() {}
}
