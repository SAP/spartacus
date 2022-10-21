import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  defaultSsrBackendRequestTimeoutConfig,
  SSR_BACKEND_REQUEST_TIMEOUT_CONFIG,
} from './ssr-backend-request-timeout.config';
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
export class SsrBackendRequestTimeoutModule {
  static withConfig(config: {
    timeout?: number;
  }): ModuleWithProviders<SsrBackendRequestTimeoutModule> {
    return {
      ngModule: SsrBackendRequestTimeoutModule,
      providers: [
        {
          provide: SSR_BACKEND_REQUEST_TIMEOUT_CONFIG,
          useValue: config?.timeout ?? defaultSsrBackendRequestTimeoutConfig,
        },
      ],
    };
  }
}
