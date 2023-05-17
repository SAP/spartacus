import { ErrorHandler, inject } from '@angular/core';
import { ERROR_HANDLER } from '@spartacus/core';

export class MultiErrorHandler implements ErrorHandler {
  #handlers = inject(ERROR_HANDLER, { optional: true }) || [];

  handleError(error: any) {
    this.#handlers.forEach((handler) => handler.handleError(error));
  }
}

export function provideMultiErrorHandler() {
  return {
    provide: ErrorHandler,
    useClass: MultiErrorHandler,
  };
}
