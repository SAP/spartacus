import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, ConfigModule } from '../../config/config.module';
import { AuthConfig } from '../config/auth-config';
import { defaultAuthConfig } from '../config/default-auth-config';
import { OccUserIdStoreModule } from './store/occ-user-id-store.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OccUserIdStoreModule,
    ConfigModule.withConfig(defaultAuthConfig),
  ],
})
export class OccUserIdModule {
  static forRoot(): ModuleWithProviders<OccUserIdModule> {
    return {
      ngModule: OccUserIdModule,
      providers: [{ provide: AuthConfig, useExisting: Config }],
    };
  }
}
