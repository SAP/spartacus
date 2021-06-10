import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Config, provideDefaultConfig } from '@spartacus/core';
import { CpqConfiguratorRestInterceptor } from './cpq-configurator-rest.interceptor';
import { defaultCpqConfiguratorAuthConfig } from './default-cpq-configurator-auth.config';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CpqConfiguratorRestInterceptor,
      multi: true,
    },
    provideDefaultConfig(defaultCpqConfiguratorAuthConfig as Config),
  ],
})
export class CpqConfiguratorInterceptorModule {}
