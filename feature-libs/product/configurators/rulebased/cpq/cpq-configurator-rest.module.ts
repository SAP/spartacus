import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RulebasedConfiguratorConnector } from '../core/connectors/rulebased-configurator.connector';
import { CpqConfiguratorRestAdapter } from './cpq-configurator-rest.adapter';
import { CpqConfiguratorNormalizer } from './cpq-configurator-normalizer';
import { CPQ_CONFIGURATOR_NORMALIZER } from './cpq-configurator.converters';

@NgModule({
  imports: [CommonModule],

  providers: [
    {
      provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
      useClass: CpqConfiguratorRestAdapter,
      multi: true,
    },
    {
      provide: CPQ_CONFIGURATOR_NORMALIZER,
      useExisting: CpqConfiguratorNormalizer,
      multi: true,
    },
  ],
})
export class CpqConfiguratorRestModule {}
