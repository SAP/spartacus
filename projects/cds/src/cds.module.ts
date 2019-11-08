import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig, provideConfigValidator } from '@spartacus/core';
import { CdsConfig } from './config/cds-config';
import { cdsConfigValidator } from './config/cds-config-validator';
import { DEFAULT_CDS_CONFIG } from './config/default-cds-config';
import { MerchandisingStrategyAdapter } from './merchandising/adapters/strategy/merchandising.strategy.adapter';
import {
  MERCHANDISING_PRODUCTS_NORMALIZER,
  MERCHANDISING_PRODUCT_NORMALIZER,
} from './merchandising/connectors/strategy/converters';
import { StrategyAdapter } from './merchandising/connectors/strategy/strategy.adapter';
import { MerchandisingProductNormalizer } from './merchandising/converters/merchandising-product-normalizer';
import { MerchandisingProductsNormalizer } from './merchandising/converters/merchandising-products-normalizer';

@NgModule()
export class CdsModule {
  static forRoot(): ModuleWithProviders<CdsModule> {
    return {
      ngModule: CdsModule,
      providers: [
        { provide: CdsConfig, useExisting: Config },
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
        provideConfig(DEFAULT_CDS_CONFIG),
        provideConfigValidator(cdsConfigValidator),
      ],
    };
  }
}
