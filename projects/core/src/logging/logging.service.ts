import { Injectable } from '@angular/core';
import { ServerConfig } from '../config/server-config/server-config';

@Injectable({ providedIn: 'root' })
export class LoggingService {

  constructor(private serverConfig: ServerConfig) { }

  trace(message, ...additional: any[]) {
    if (!this.serverConfig.production) {
      // tslint:disable-next-line:no-console
      console.trace(message, ...additional);
    }
  }

  info(message, ...additional: any[]) {
    if (!this.serverConfig.production) {
      // tslint:disable-next-line:no-console
      console.info(message, ...additional);
    }
  }

  warn(message, ...additional: any[]) {
    if (!this.serverConfig.production) {
      console.warn(message, ...additional);
    }
  }

  error(message, ...additional: any[]) {
    if (!this.serverConfig.production) {
      console.error(message, ...additional);
    }
  }

  log(message, ...additional: any[]) {
    if (!this.serverConfig.production) {
      console.log(message, ...additional);
    }
  }
}
