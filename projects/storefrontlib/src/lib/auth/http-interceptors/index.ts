import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthErrorInterceptor } from './auth-error.interceptor';
import { ClientTokenInterceptor } from './client-token.interceptor';
import { UserHttpInterceptor } from './user-http.interceptor';
import { Provider } from '@angular/core';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ClientTokenInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UserHttpInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthErrorInterceptor,
    multi: true
  }
];
