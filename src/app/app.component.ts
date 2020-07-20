import { Component, ViewChild, ElementRef } from '@angular/core';
import { interval, Subscription, Observable, fromEvent, Subject } from 'rxjs';
import { filter, map, skip, switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  timer: Timer;
  sub: Subscription;

  constructor() {
    this.timer = new Timer();
  }

  ngOnInit() {
    const bs = new Subject<any>();
    bs.pipe(
      debounceTime(300)
    ).subscribe(() => this.isClicked = false);
       
    fromEvent(this.waitButton.nativeElement, 'click')
      .subscribe(() => {
        if (!this.isClicked) {
          this.isClicked = true;
          bs.next();
        }
        else
          this.pauseTimer();
      });
  }

  @ViewChild('waitButton', { static: true })
  private waitButton: ElementRef;

  isClicked: boolean = false;
  

  /**
   * Toggles timer
   */
  toggleTimer() {
    if (this.timer.isStarted && !this.timer.isPaused)
      this.restartTimer();
    else
      this.startTimer();
  }

  startTimer() {
    this.timer = Object.assign(this.timer, { isStarted: true, isPaused: false });

    this.sub = interval(1000)
      .subscribe(() => {
        const seconds = this.timer.seconds + 1;
        const isOverSeconds = seconds == 60;
        const minutes = this.timer.minutes + +isOverSeconds;
        const isOverMinutes = minutes == 60;

        this.timer = Object.assign(this.timer, {
          hours: this.timer.hours + +isOverMinutes,
          minutes: minutes % 60,
          seconds: seconds % 60
        });
      });
  }

  restartTimer() {
    this.sub?.unsubscribe();
    this.timer = new Timer();
  }

  resetTimer() {
    this.restartTimer();
    this.startTimer();
  }

  pauseTimer() {
    this.timer = Object.assign(this.timer, { isPaused: true });
    this.sub?.unsubscribe();
  }

  /**
   * Returns text that shows in main button
   */
  get buttonText() {
    return this.timer.isStarted ? (this.timer.isPaused ? "Resume" : "Stop") : "Start";
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
  isStarted: boolean = false; // Is timer started
  isPaused: boolean = false; // Is timer paused

  /**
   *
   */
  constructor() {
  }
}
