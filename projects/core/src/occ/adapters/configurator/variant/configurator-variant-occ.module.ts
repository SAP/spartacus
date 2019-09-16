import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfiguratorCommonsAdapter } from '../../../../configurator/commons/connectors/configurator-commons.adapter';
import { ConfigModule } from './../../../../config';
import { CONFIGURATION_NORMALIZER } from './../../../../configurator/commons/connectors/converters';
import { OccConfiguratorVariantNormalizer } from './converters';
import { defaultOccCartConfig } from './default-occ-configurator-variant-config';
import { OccConfiguratorVariantAdapter } from './occ-configurator-variant.adapter';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfig(defaultOccCartConfig),
  ],
  providers: [
    {
      provide: ConfiguratorCommonsAdapter,
      useClass: OccConfiguratorVariantAdapter,
    },
    {
      provide: CONFIGURATION_NORMALIZER,
      useClass: OccConfiguratorVariantNormalizer,
      multi: true,
    },
  ],
})
export class ConfiguratorVariantOccModule {}
