import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SsrBackendRequestTimeoutInterceptor } from './ssr-backend-request-timeout.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: SsrBackendRequestTimeoutInterceptor,
      multi: true,
    },
  ],
})
export class SsrBackendRequestTimeoutModule {}
