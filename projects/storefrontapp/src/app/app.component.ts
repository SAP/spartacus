import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  testModeEnabled = false;

  constructor(protected location: Location) {}

  ngOnInit(): void {
    this.detectTestMode();
  }

  detectTestMode(): void {
    const params = this.location.path().split('?')[1];
    this.testModeEnabled = params && params.split('&').includes(`test=true`);
  }
}
