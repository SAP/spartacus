import { ModuleWithProviders, NgModule } from '@angular/core';
import { CdsConfig, cdsConfigToken } from './config/cds.config';
import { MerchandisingStrategyAdapter } from './merchandising/adapters/strategy/merchandising.strategy.adapter';
import {
  MERCHANDISING_PRODUCTS_NORMALIZER,
  MERCHANDISING_PRODUCT_NORMALIZER,
} from './merchandising/connectors/strategy/converters';
import { StrategyAdapter } from './merchandising/connectors/strategy/strategy.adapter';
import { MerchandisingProductNormalizer } from './merchandising/converters/merchandising-product-normalizer';
import { MerchandisingProductsNormalizer } from './merchandising/converters/merchandising-products-normalizer';
import { ProfileTagModule } from './profiletag/profile-tag.module';

@NgModule({
  imports: [ProfileTagModule],
  exports: [ProfileTagModule],
})
export class CdsModule {
  static withConfig(config: CdsConfig): ModuleWithProviders<CdsModule> {
    return {
      ngModule: CdsModule,
      providers: [
        { provide: cdsConfigToken, useValue: config },
        { provide: StrategyAdapter, useClass: MerchandisingStrategyAdapter },
        {
          provide: MERCHANDISING_PRODUCTS_NORMALIZER,
          useClass: MerchandisingProductsNormalizer,
          multi: true,
        },
        {
          provide: MERCHANDISING_PRODUCT_NORMALIZER,
          useClass: MerchandisingProductNormalizer,
          multi: true,
        },
      ],
    };
  }
}
