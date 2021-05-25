import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import {
  BadGatewayHandler,
  BadRequestHandler,
  ConflictHandler,
  ForbiddenHandler,
  GatewayTimeoutHandler,
  HttpErrorHandler,
  InternalServerErrorHandler,
  NotFoundHandler,
  UnknownErrorHandler,
} from './handlers/index';
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
];

export const httpErrorInterceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: HttpErrorInterceptor,
    multi: true,
  },
];
