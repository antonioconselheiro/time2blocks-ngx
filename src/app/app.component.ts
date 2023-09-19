import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  getCurrentTimeInMinutes(): number {
    return Math.floor(new Date().getTime() / 60_000);
  }
}
