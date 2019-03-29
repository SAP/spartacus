import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { HttpErrorHandler } from './handlers/http-error.handler';
import { UnknownErrorHandler } from './handlers/unknown-error.handler';
import { BadGatewayHandler } from './handlers/bad-gateway.handler';
import { BadRequestHandler } from './handlers/bad-request.handler';
import { ConflictHandler } from './handlers/conflict.handler';
import { ForbiddenHandler } from './handlers/forbidden.handler';
import { GatewayTimeoutHandler } from './handlers/gateway-timeout.handler';
import { NotFoundHandler } from './handlers/not-found.handler';

export const errorHandlers: Provider[] = [
  {
    provide: HttpErrorHandler,
    useExisting: UnknownErrorHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: BadGatewayHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: BadRequestHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: ConflictHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: ForbiddenHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: GatewayTimeoutHandler,
    multi: true
  },
  {
    provide: HttpErrorHandler,
    useExisting: NotFoundHandler,
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
