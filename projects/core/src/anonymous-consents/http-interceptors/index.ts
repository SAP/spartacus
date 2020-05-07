import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AnonymousConsentsInterceptor } from './anonymous-consents-interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: AnonymousConsentsInterceptor,
    multi: true,
  },
];
