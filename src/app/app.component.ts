import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  getCurrentTime(): number {
    return Math.floor(new Date().getTime() / 1000);
  }
}
