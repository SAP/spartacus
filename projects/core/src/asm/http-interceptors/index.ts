import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { CSAgentTokenInterceptor } from './csagent-token.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: CSAgentTokenInterceptor,
    multi: true,
  },
];
