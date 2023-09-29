import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentTime = Math.floor(new Date().getTime() / 1000);

  private readonly oneMin = 1_000 * 60;

  ngOnInit(): void {
    setInterval(() => this.updateTime(), this.oneMin);
  }

  updateTime(): void {
    this.currentTime = Math.floor(new Date().getTime() / 1000);
  }
}
