import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '@spartacus/core';
import { ConfiguratorTextfieldAdapter } from '../core/connectors/configurator-textfield.adapter';
import {
  CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER,
  CONFIGURATION_TEXTFIELD_NORMALIZER,
  CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER,
} from '../core/connectors/converters';
import { OccConfiguratorTextfieldAddToCartSerializer } from './converters/occ-configurator-textfield-add-to-cart-serializer';
import { OccConfiguratorTextfieldNormalizer } from './converters/occ-configurator-textfield-normalizer';
import { OccConfiguratorTextfieldUpdateCartEntrySerializer } from './converters/occ-configurator-textfield-update-cart-entry-serializer';
import { defaultOccConfiguratorTextfieldConfigFactory } from './default-occ-configurator-textfield-config';
import { OccConfiguratorTextfieldAdapter } from './occ-configurator-textfield.adapter';

@NgModule({
  imports: [
    CommonModule,

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
      provide: CONFIGURATION_TEXTFIELD_NORMALIZER,
      useExisting: OccConfiguratorTextfieldNormalizer,
      multi: true,
    },
    {
      provide: CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER,
      useExisting: OccConfiguratorTextfieldAddToCartSerializer,
      multi: true,
    },
    {
      provide: CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER,
      useExisting: OccConfiguratorTextfieldUpdateCartEntrySerializer,
      multi: true,
    },
  ],
})
export class TextfieldConfiguratorOccModule {}
