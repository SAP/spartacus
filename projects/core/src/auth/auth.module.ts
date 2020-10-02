import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { defaultAuthConfig } from './config/default-auth-config';
import { interceptors } from './http-interceptors/index';
import { AuthStoreModule } from './store/auth-store.module';
import { provideDefaultConfig } from '../config/config-providers';

@NgModule({
  imports: [CommonModule, HttpClientModule, AuthStoreModule],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [provideDefaultConfig(defaultAuthConfig), ...interceptors],
    };
  }
}
