import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { CustomerSupportAgentTokenInterceptor } from './csagent-token.interceptor';
import { CustomerSupportAgentAuthErrorInterceptor } from './csagent-auth-error.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: CustomerSupportAgentTokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: CustomerSupportAgentAuthErrorInterceptor,
    multi: true,
  },
];
