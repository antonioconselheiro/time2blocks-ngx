import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {

  currentTime = this.updateTime();

  private readonly oneSec = 1_000 * 10;
  private intervalId!: number;

  ngOnInit(): void {
    this.intervalId = +setInterval(() => this.currentTime = this.updateTime(), this.oneSec);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  updateTime(): number {
    return Math.floor(new Date().getTime() / 1000);
  }
}
