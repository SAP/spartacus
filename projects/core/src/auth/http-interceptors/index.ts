import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthErrorInterceptor } from './auth-error.interceptor';
import { ClientTokenInterceptor } from './client-token.interceptor';
import { CustomerSupportAgentTokenInterceptor } from './csagent-token.interceptor';
import { UserTokenInterceptor } from './user-token.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomerSupportAgentTokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ClientTokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UserTokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthErrorInterceptor,
    multi: true,
  },
];
