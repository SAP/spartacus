import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '@spartacus/core';
import {
  CONFIGURATION_ADD_TO_CART_SERIALIZER,
  CONFIGURATION_NORMALIZER,
  CONFIGURATION_OVERVIEW_NORMALIZER,
  CONFIGURATION_PRICE_SUMMARY_NORMALIZER,
  CONFIGURATION_SERIALIZER,
  CONFIGURATION_UPDATE_CART_ENTRY_SERIALIZER,
  ConfiguratorCommonsAdapter,
} from '@spartacus/product/configurators/common';
import { OccConfiguratorVariantAddToCartSerializer } from './converters/occ-configurator-variant-add-to-cart-serializer';
import { OccConfiguratorVariantNormalizer } from './converters/occ-configurator-variant-normalizer';
import { OccConfiguratorVariantOverviewNormalizer } from './converters/occ-configurator-variant-overview-normalizer';
import { OccConfiguratorVariantPriceSummaryNormalizer } from './converters/occ-configurator-variant-price-summary-normalizer';
import { OccConfiguratorVariantSerializer } from './converters/occ-configurator-variant-serializer';
import { OccConfiguratorVariantUpdateCartEntrySerializer } from './converters/occ-configurator-variant-update-cart-entry-serializer';
import { defaultOccVariantConfiguratorConfigFactory } from './default-occ-configurator-variant-config';
import { OccConfiguratorVariantAdapter } from './occ-configurator-variant.adapter';

@NgModule({
  imports: [
    CommonModule,

    ConfigModule.withConfigFactory(defaultOccVariantConfiguratorConfigFactory),
  ],
  providers: [
    {
      provide: ConfiguratorCommonsAdapter,
      useClass: OccConfiguratorVariantAdapter,
    },
    {
      provide: CONFIGURATION_NORMALIZER,
      useExisting: OccConfiguratorVariantNormalizer,
      multi: true,
    },
    {
      provide: CONFIGURATION_SERIALIZER,
      useExisting: OccConfiguratorVariantSerializer,
      multi: true,
    },
    {
      provide: CONFIGURATION_PRICE_SUMMARY_NORMALIZER,
      useExisting: OccConfiguratorVariantPriceSummaryNormalizer,
      multi: true,
    },
    {
      provide: CONFIGURATION_ADD_TO_CART_SERIALIZER,
      useExisting: OccConfiguratorVariantAddToCartSerializer,
      multi: true,
    },
    {
      provide: CONFIGURATION_UPDATE_CART_ENTRY_SERIALIZER,
      useExisting: OccConfiguratorVariantUpdateCartEntrySerializer,
      multi: true,
    },
    {
      provide: CONFIGURATION_OVERVIEW_NORMALIZER,
      useExisting: OccConfiguratorVariantOverviewNormalizer,
      multi: true,
    },
  ],
})
export class VariantConfiguratorOccModule {}
