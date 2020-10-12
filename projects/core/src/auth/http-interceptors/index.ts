import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { ClientTokenInterceptor } from './client-token.interceptor';
import { TokenRevocationInterceptor } from './token-revocation.interceptor';
import { UserTokenInterceptor } from './user-token.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: ClientTokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: UserTokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: TokenRevocationInterceptor,
    multi: true,
  },
];
