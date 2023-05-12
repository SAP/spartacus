import { ErrorHandler } from '@angular/core';
import { ERROR_HANDLER } from '../../../../../core/src/error/tokens/error-handler.token';

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
