import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '@spartacus/core';
import { CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER } from './converters/cpq-configurator-occ.converters';
import { OccConfiguratorCpqAddToCartSerializer } from './converters/occ-configurator-cpq-add-to-cart-serializer';
import { defaultOccCpqConfiguratorConfigFactory } from './default-occ-configurator-cpq-config';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfigFactory(defaultOccCpqConfiguratorConfigFactory),
  ],
  providers: [
    {
      provide: CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
      useExisting: OccConfiguratorCpqAddToCartSerializer,
      multi: true,
    },
  ],
})
export class CpqConfiguratorOccModule {}
