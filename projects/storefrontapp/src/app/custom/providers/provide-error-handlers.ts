import { ErrorHandler } from '@angular/core';
import { ERROR_HANDLER } from '@spartacus/core';

export function provideErrorHandlers(
  factories: Array<() => (error: any) => void | Promise<void>>
) {
  return factories.map((factory) => ({
    provide: ERROR_HANDLER,
    multi: true,
    useFactory: () => {
      const serverErrorHandler = new ErrorHandler();
      serverErrorHandler.handleError = factory();
      return serverErrorHandler;
    },
  }));
}
