import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OccConfiguratorCpqUpdateCartEntrySerializer } from './converters';
import {
  CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
  CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
} from './converters/cpq-configurator-occ.converters';
import { OccConfiguratorCpqAddToCartSerializer } from './converters/occ-configurator-cpq-add-to-cart-serializer';
import { defaultOccCpqConfiguratorConfigFactory } from './default-occ-configurator-cpq-config';
import { provideDefaultConfigFactory } from '@spartacus/core';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfigFactory(defaultOccCpqConfiguratorConfigFactory),
    {
      provide: CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
      useExisting: OccConfiguratorCpqAddToCartSerializer,
      multi: true,
    },
    {
      provide: CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
      useExisting: OccConfiguratorCpqUpdateCartEntrySerializer,
      multi: true,
    },
  ],
})
export class CpqConfiguratorOccModule {}
