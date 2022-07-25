import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';
import { TokenRevocationInterceptor } from './token-revocation.interceptor';
import {
  UserIdPathAllowList,
  UserIdPathAllowListInjectionToken,
} from './user-id-allow-list.const';
import { UserIdInterceptor } from './user-id.interceptor';

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
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: UserIdInterceptor,
    multi: true,
  },
];

export const configuration: Array<Provider> = [
  {
    provide: UserIdPathAllowListInjectionToken,
    useValue: UserIdPathAllowList,
  },
];

export const interceptorProviders: Array<Provider> = [
  ...interceptors,
  ...configuration,
];
