import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { HttpErrorHandler } from './handlers';
import * as handlers from './handlers';

export const errorHandlers: Provider[] = [
  {
    provide: HttpErrorHandler,
    useExisting: handlers.UnknownErrorHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: handlers.BadGatewayHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: handlers.BadRequestHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: handlers.ConflictHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: handlers.ForbiddenHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: handlers.GatewayTimeoutHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: handlers.NotFoundHandler,
    multi: true
  }
];

export const httpErrorInterceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }
];
