import { StaticProvider } from '@angular/core';
import { LoggingErrorHandler } from './logging-error-handler';
import { MULTI_ERROR_HANDLERS } from './multi-error-handlers';

export function provideMultiErrorHandlers(): StaticProvider[] {
  return [
    {
      provide: MULTI_ERROR_HANDLERS,
      useExisting: LoggingErrorHandler,
      multi: true,
    },
  ];
}
