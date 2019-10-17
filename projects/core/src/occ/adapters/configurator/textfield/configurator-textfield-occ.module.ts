import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfigModule } from '../../../../config/config.module';
import { ConfiguratorTextfieldAdapter } from '../../../../configurator/textfield/connectors/configurator-textfield.adapter';
import { CONFIGURATION_NORMALIZER } from '../../../../configurator/textfield/connectors/converters';
import { OccConfiguratorTextfieldNormalizer } from './converters/occ-configurator-textfield-normalizer';
import { defaultOccConfiguratorTextfieldConfigFactory } from './default-occ-configurator-textfield-config';
import { OccConfiguratorTextfieldAdapter } from './occ-configurator-textfield.adapter';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfigFactory(
      defaultOccConfiguratorTextfieldConfigFactory
    ),
  ],
  providers: [
    {
      provide: ConfiguratorTextfieldAdapter,
      useClass: OccConfiguratorTextfieldAdapter,
    },
    {
      provide: CONFIGURATION_NORMALIZER,
      useClass: OccConfiguratorTextfieldNormalizer,
      multi: true,
    },
  ],
})
export class ConfiguratorTextfieldOccModule {}
