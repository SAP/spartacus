import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { HttpErrorHandler } from './handlers';
import * as handers from './handlers';

export const errorHandlers: Provider[] = [
  {
    provide: HttpErrorHandler,
    useExisting: handers.UnknownErrorHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: handers.BadGatewayHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: handers.BadRequestHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: handers.ConflictHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: handers.ForbiddenHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: handers.GatewayTimeoutHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: handers.NotFoundHandler,
    multi: true
  }
];

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }
];
