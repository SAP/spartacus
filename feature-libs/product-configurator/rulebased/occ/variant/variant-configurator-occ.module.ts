import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '@spartacus/core';
import { RulebasedConfiguratorConnector } from '../../core/connectors/rulebased-configurator.connector';
import { OccConfiguratorVariantAddToCartSerializer } from './converters/occ-configurator-variant-add-to-cart-serializer';
import { OccConfiguratorVariantNormalizer } from './converters/occ-configurator-variant-normalizer';
import { OccConfiguratorVariantOverviewNormalizer } from './converters/occ-configurator-variant-overview-normalizer';
import { OccConfiguratorVariantPriceSummaryNormalizer } from './converters/occ-configurator-variant-price-summary-normalizer';
import { OccConfiguratorVariantPriceNormalizer } from './converters/occ-configurator-variant-price-normalizer';
import { OccConfiguratorVariantSerializer } from './converters/occ-configurator-variant-serializer';
import { OccConfiguratorVariantUpdateCartEntrySerializer } from './converters/occ-configurator-variant-update-cart-entry-serializer';
import { defaultOccVariantConfiguratorConfigFactory } from './default-occ-configurator-variant-config';
import { VariantConfiguratorOccAdapter } from './variant-configurator-occ.adapter';
import {
  VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
  VARIANT_CONFIGURATOR_NORMALIZER,
  VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER,
  VARIANT_CONFIGURATOR_PRICE_NORMALIZER,
  VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER,
  VARIANT_CONFIGURATOR_SERIALIZER,
  VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
} from './variant-configurator-occ.converters';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfigFactory(defaultOccVariantConfiguratorConfigFactory),
  ],
  providers: [
    {
      provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
      useClass: VariantConfiguratorOccAdapter,
      multi: true,
    },
    {
      provide: VARIANT_CONFIGURATOR_NORMALIZER,
      useExisting: OccConfiguratorVariantNormalizer,
      multi: true,
    },
    {
      provide: VARIANT_CONFIGURATOR_SERIALIZER,
      useExisting: OccConfiguratorVariantSerializer,
      multi: true,
    },
    {
      provide: VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER,
      useExisting: OccConfiguratorVariantPriceSummaryNormalizer,
      multi: true,
    },
    {
      provide: VARIANT_CONFIGURATOR_PRICE_NORMALIZER,
      useExisting: OccConfiguratorVariantPriceNormalizer,
      multi: true,
    },
    {
      provide: VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
      useExisting: OccConfiguratorVariantAddToCartSerializer,
      multi: true,
    },
    {
      provide: VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
      useExisting: OccConfiguratorVariantUpdateCartEntrySerializer,
      multi: true,
    },
    {
      provide: VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER,
      useExisting: OccConfiguratorVariantOverviewNormalizer,
      multi: true,
    },
  ],
})
export class VariantConfiguratorOccModule {}
