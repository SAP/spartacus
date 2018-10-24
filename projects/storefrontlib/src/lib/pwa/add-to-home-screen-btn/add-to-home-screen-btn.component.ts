import { Component, OnInit } from '@angular/core';
import { PWAModuleConfig } from '../pwa.module-config';

@Component({
  selector: 'cx-add-to-home-screen-btn',
  templateUrl: './add-to-home-screen-btn.component.html'
})
export class AddToHomeScreenBtnComponent implements OnInit {
  canPrompt = false;
  isEnabled = false;
  deferredEvent: any;
  constructor(private config: PWAModuleConfig) {}

  ngOnInit() {
    this.isEnabled = this.config.pwa.addToHomeScreen;
    if (this.isEnabled) {
      window.addEventListener('beforeinstallprompt', event => {
        console.log(event);
        event.preventDefault();
        this.deferredEvent = event;
        this.canPrompt = true;
        console.log(this.deferredEvent);
      });
    }
  }

  prompt() {
    console.log('prompting', this.deferredEvent);
    this.deferredEvent.prompt();
  }
}
