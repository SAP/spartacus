import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { UnauthorizedErrorHandler } from './handlers';
import { BadGatewayHandler } from './handlers/bad-gateway.handler';
import { BadRequestHandler } from './handlers/bad-request.handler';
import { ConflictHandler } from './handlers/conflict.handler';
import { ForbiddenHandler } from './handlers/forbidden.handler';
import { GatewayTimeoutHandler } from './handlers/gateway-timeout.handler';
import { HttpErrorHandler } from './handlers/http-error.handler';
import { InternalServerErrorHandler } from './handlers/internal-server-error.handler';
import { NotFoundHandler } from './handlers/not-found.handler';
import { UnknownErrorHandler } from './handlers/unknown-error.handler';
import { HttpErrorInterceptor } from './http-error.interceptor';

export const errorHandlers: Provider[] = [
  {
    provide: HttpErrorHandler,
    useExisting: UnknownErrorHandler,
    multi: true,
  },
  {
    provide: HttpErrorHandler,
    useExisting: BadGatewayHandler,
    multi: true,
  },
  {
    provide: HttpErrorHandler,
    useExisting: BadRequestHandler,
    multi: true,
  },
  {
    provide: HttpErrorHandler,
    useExisting: ConflictHandler,
    multi: true,
  },
  {
    provide: HttpErrorHandler,
    useExisting: ForbiddenHandler,
    multi: true,
  },
  {
    provide: HttpErrorHandler,
    useExisting: GatewayTimeoutHandler,
    multi: true,
  },
  {
    provide: HttpErrorHandler,
    useExisting: InternalServerErrorHandler,
    multi: true,
  },
  {
    provide: HttpErrorHandler,
    useExisting: NotFoundHandler,
    multi: true,
  },
  {
    provide: HttpErrorHandler,
    useExisting: UnauthorizedErrorHandler,
    multi: true,
  },
];

export const httpErrorInterceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: HttpErrorInterceptor,
    multi: true,
  },
];
