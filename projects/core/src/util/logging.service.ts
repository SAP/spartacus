import { isDevMode } from '@angular/core';

class LoggingService {
  get trace(): Function {
    // tslint:disable-next-line:no-console
    return this.bindConsole(console.trace);
  }

  get info(): Function {
    // tslint:disable-next-line:no-console
    return this.bindConsole(console.info);
  }

  get warn(): Function {
    return this.bindConsole(console.warn);
  }

  get error(): Function {
    return this.bindConsole(console.error);
  }

  get log(): Function {
    return this.bindConsole(console.log);
  }

  private bindConsole(logFunction: Function): Function {
    return isDevMode() ? logFunction.bind(window.console) : () => {};
  }
}

export const logger = new LoggingService();
