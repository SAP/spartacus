import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { defaultAuthConfig } from './config/default-auth-config';
import { interceptors } from './http-interceptors/index';
import { AuthStoreModule } from './store/auth-store.module';
import { provideDefaultConfig } from '../config/config-providers';

@NgModule({
  imports: [CommonModule, AuthStoreModule],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [provideDefaultConfig(defaultAuthConfig), ...interceptors],
    };
  }
}
