import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig, provideConfigValidator } from '@spartacus/core';
import { MerchandisingCarouselModule } from './cms-components';
import { CdsConfig } from './config/cds-config';
import { cdsConfigValidator } from './config/cds-config-validator';
import { DEFAULT_CDS_CONFIG } from './config/default-cds-config';
import { CdsMerchandisingStrategyAdapter } from './merchandising/adapters/strategy/cds-merchandising-strategy.adapter';
import {
  MERCHANDISING_PRODUCTS_NORMALIZER,
  MERCHANDISING_PRODUCT_NORMALIZER,
} from './merchandising/connectors/strategy/converters';
import { MerchandisingStrategyAdapter } from './merchandising/connectors/strategy/merchandising-strategy.adapter';
import { MerchandisingProductNormalizer } from './merchandising/converters/merchandising-product-normalizer';
import { MerchandisingProductsNormalizer } from './merchandising/converters/merchandising-products-normalizer';

@NgModule({
  imports: [MerchandisingCarouselModule],
})
export class CdsModule {
  static forRoot(): ModuleWithProviders<CdsModule> {
    return {
      ngModule: CdsModule,
      providers: [
        { provide: CdsConfig, useExisting: Config },
        {
          provide: MerchandisingStrategyAdapter,
          useExisting: CdsMerchandisingStrategyAdapter,
        },
        {
          provide: MERCHANDISING_PRODUCTS_NORMALIZER,
          useExisting: MerchandisingProductsNormalizer,
          multi: true,
        },
        {
          provide: MERCHANDISING_PRODUCT_NORMALIZER,
          useExisting: MerchandisingProductNormalizer,
          multi: true,
        },
        provideConfig(DEFAULT_CDS_CONFIG),
        provideConfigValidator(cdsConfigValidator),
      ],
    };
  }
}
