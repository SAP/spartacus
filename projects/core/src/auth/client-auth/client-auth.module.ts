import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { interceptors } from './http-interceptors/index';
import { ClientAuthStoreModule } from './store/client-auth-store.module';

/**
 * Some of the OCC endpoints require Authorization header with the client token (eg. user registration).
 * This pattern should not be used in the frontend apps, but until OCC changes this requirement
 * we provide this module to support using those endpoints.
 *
 * After OCC improvements regarding client authentication this module can be safely removed.
 */
@NgModule({
  imports: [CommonModule, ClientAuthStoreModule],
})
export class ClientAuthModule {
  static forRoot(): ModuleWithProviders<ClientAuthModule> {
    return {
      ngModule: ClientAuthModule,
      providers: [...interceptors],
    };
  }
}
