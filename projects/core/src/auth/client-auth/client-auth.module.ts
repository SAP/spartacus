import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { interceptors } from './http-interceptors/index';
import { ClientAuthStoreModule } from './store/client-auth-store.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, ClientAuthStoreModule],
})
export class ClientAuthModule {
  static forRoot(): ModuleWithProviders<ClientAuthModule> {
    return {
      ngModule: ClientAuthModule,
      providers: [...interceptors],
    };
  }
}
