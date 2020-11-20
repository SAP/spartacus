import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RulebasedConfiguratorConnector } from '../core/connectors/rulebased-configurator.connector';
import { CpqConfiguratorRestAdapter } from './cpq-configurator-rest.adapter';
import { CpqConfiguratorRestInterceptor } from './cpq-configurator-rest.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
      useClass: CpqConfiguratorRestAdapter,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: CpqConfiguratorRestInterceptor,
      multi: true,
    },
  ],
})
export class CpqConfiguratorRestModule {}
