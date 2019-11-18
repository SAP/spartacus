import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig, provideConfigValidator } from '@spartacus/core';
import { MerchandisingCarouselModule } from './cms-components/merchandising/carousel/merchandising-carousel/merchandising-carousel.module';
import { cdsConfigValidator } from './config';
import { CdsConfig } from './config/cds-config';
import { DEFAULT_CDS_CONFIG } from './config/default-cds-config';
import { CdsMerchandisingStrategyAdapter } from './merchandising/adapters/strategy/cds-merchandising-strategy.adapter';
import {
  MERCHANDISING_PRODUCTS_NORMALIZER,
  MERCHANDISING_PRODUCT_NORMALIZER,
} from './merchandising/connectors/strategy/converters';
import { MerchandisingStrategyAdapter } from './merchandising/connectors/strategy/merchandising-strategy.adapter';
import { MerchandisingProductNormalizer } from './merchandising/converters/merchandising-product-normalizer';
import { MerchandisingProductsNormalizer } from './merchandising/converters/merchandising-products-normalizer';
import { ProfileTagModule } from './profiletag/profile-tag.module';

@NgModule({
  imports: [ProfileTagModule, MerchandisingCarouselModule],
})
export class CdsModule {
  static forRoot(config: CdsConfig): ModuleWithProviders<CdsModule> {
    return {
      ngModule: CdsModule,
      providers: [
        provideConfig(DEFAULT_CDS_CONFIG),
        provideConfig(config),
        provideConfigValidator(cdsConfigValidator),
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
      ],
    };
  }
}
