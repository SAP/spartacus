import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  CpqConfiguratorTokenConfig,
  DefaultCpqConfiguratorTokenConfig,
} from './cpq-access-storage.service';
import { CpqConfiguratorRestInterceptor } from './cpq-configurator-rest.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CpqConfiguratorRestInterceptor,
      multi: true,
    },

    provideDefaultConfig(DefaultCpqConfiguratorTokenConfig),
    { provide: CpqConfiguratorTokenConfig, useExisting: {} },
  ],
})
export class CpqConfiguratorInterceptorModule {}
