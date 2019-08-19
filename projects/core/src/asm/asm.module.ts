import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthConfig } from '../auth/config/auth-config';
import { defaultAuthConfig } from '../auth/config/default-auth-config';
import { Config, provideConfig } from '../config/config.module';
import { CustomerServices } from './services/index';
import { AsmStoreModule } from './store/asm-store.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, AsmStoreModule],
})
export class AsmModule {
  static forRoot(): ModuleWithProviders<AsmModule> {
    return {
      ngModule: AsmModule,
      providers: [
        ...CustomerServices,
        { provide: AuthConfig, useExisting: Config },
        provideConfig(defaultAuthConfig),
      ],
    };
  }
}
