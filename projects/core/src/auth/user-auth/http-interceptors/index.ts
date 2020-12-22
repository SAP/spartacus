import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';
import { TokenRevocationInterceptor } from './token-revocation.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: TokenRevocationInterceptor,
    multi: true,
  },
];
