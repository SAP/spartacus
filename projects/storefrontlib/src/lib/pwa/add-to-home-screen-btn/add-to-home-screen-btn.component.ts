import { Component, HostListener } from '@angular/core';
import { PWAModuleConfig } from '../pwa.module-config';

@Component({
  selector: 'cx-add-to-home-screen-btn',
  templateUrl: './add-to-home-screen-btn.component.html'
})
export class AddToHomeScreenBtnComponent {
  canPrompt = false;
  deferredEvent: any;
  constructor(private config: PWAModuleConfig) {}

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event) {
    if (this.config.pwa.addToHomeScreen) {
      this.deferredEvent = event;
      this.canPrompt = true;
    }
  }

  prompt() {
    if (this.config.pwa.addToHomeScreen) this.deferredEvent.prompt();
  }
}
