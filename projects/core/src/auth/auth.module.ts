import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Config, ConfigModule } from '../config/config.module';
import { RoutingModule } from '../routing/routing.module';

import { AuthConfig } from './config/auth-config';
import { defaultAuthConfig } from './config/default-auth-config';
import { interceptors } from './http-interceptors/index';
import { services } from './services/index';
import { AuthStoreModule } from './store/auth-store.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RoutingModule,
    AuthStoreModule,
    ConfigModule.withConfig(defaultAuthConfig)
  ],
  providers: [...services, { provide: AuthConfig, useExisting: Config }]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [...interceptors]
    };
  }
}
