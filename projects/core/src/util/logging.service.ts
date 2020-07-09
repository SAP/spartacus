import { Injectable, isDevMode } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  constructor() {}

  trace(message, ...additional: any[]) {
    if (this.isDebug()) {
      // tslint:disable-next-line:no-console
      console.trace(message, ...additional);
    }
  }

  info(message, ...additional: any[]) {
    if (this.isDebug()) {
      // tslint:disable-next-line:no-console
      console.info(message, ...additional);
    }
  }

  warn(message, ...additional: any[]) {
    if (this.isDebug()) {
      console.warn(message, ...additional);
    }
  }

  error(message, ...additional: any[]) {
    if (this.isDebug()) {
      console.error(message, ...additional);
    }
  }

  log(message, ...additional: any[]) {
    if (this.isDebug()) {
      console.log(message, ...additional);
    }
  }

  isDebug(): boolean {
    return isDevMode();
  }
}
