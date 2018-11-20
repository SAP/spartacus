import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { services } from './services/index';
import { interceptors } from './http-interceptors/index';
import { AuthConfig} from './config/auth-config';
import { defaultAuthConfig } from './config/default-auth-config';
import { Config, ConfigModule } from '../config/config.module';
import { RoutingModule } from '../routing/routing.module';
import { ProductStoreModule } from '../product/store/product-store.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RoutingModule,
    ProductStoreModule,
    ConfigModule.withConfig(defaultAuthConfig)
  ],
  providers: [
    ...services,
    ...interceptors,
    { provide: AuthConfig, useExisting: Config }
  ]
})
export class AuthModule {}
