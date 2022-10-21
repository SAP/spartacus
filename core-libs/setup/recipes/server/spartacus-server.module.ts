import { NgModule } from '@angular/core';
import { SsrBackendRequestTimeoutModule } from './backend-request-timeout/ssr-backend-request-timeout.module';
import { SsrErrorHandlerModule } from './error-handler/ssr-error-handler.module';

// SPIKE TODO: move everything related to this module to a different package than /recipes

@NgModule({
  imports: [SsrErrorHandlerModule, SsrBackendRequestTimeoutModule],
})
export class SpartacusServerModule {}
