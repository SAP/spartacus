import { ErrorHandler } from '@angular/core';

export class MultiErrorHandler implements ErrorHandler {
  // #handlers = inject(ERROR_HANDLER, { optional: true }) || [];

  handleError(error: any) {
    // this.#handlers.forEach((handler) => handler.handleError(error));
    console.error('SPIKE'); // spike todo remove
    console.error(error);
  }
}

export function provideMultiErrorHandler() {
  return {
    provide: ErrorHandler,
    useClass: MultiErrorHandler,
  };
}
