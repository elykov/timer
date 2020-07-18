import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  timer: Timer;
  interv: Subscription;
  
  constructor() {
    this.resetTimer();
  }

  /**
   * Toggles timer
   */
  toggleTimer() {
    if (this.timer.isStarted)
      this.resetTimer();
    else
      this.startTimer();
  }

  startTimer() {
    this.timer = Object.assign(new Timer(), {isStarted: true});
    this.interv = interval(1000).subscribe(() => this.timer.seconds++);
  }

  resetTimer() {
    this.interv?.unsubscribe();
    this.timer = new Timer();
  }

  toggleTimerPause() {
    this.timer = Object.assign(new Timer(), {isPaused: !this.timer.isPaused});
    //.isPaused = !this.timer.isPaused;
  }

  /**
   * Returns text that shows in main button
   */
  get buttonText() {
    return this.timer.isStarted ? (this.timer.isPaused ? "Resume" : "Stop" ) : "Start";
  }

  get days() {
    return this.timer.days;
  }
  
  get hours() {
    return this.timer.hours;
  }
  
  get minutes() {
    return this.timer.minutes;
  }
  
  get seconds() {
    return this.timer.seconds;
  }
}



class Timer {
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  days: number = 0;
  isStarted: boolean = false; // Is timer started
  isPaused: boolean = false; // Is timer paused
  
  /**
   *
   */
  constructor() {
  }
}
