<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Config, provideConfigValidator } from '@spartacus/core';
import { ProfileTagModule } from './cms-components/profile-tag/profile-tag.module';
import { cdsConfigValidator } from './config/cds-config-validator';
import { CdsConfig } from './config/cds.config';

@NgModule({
  imports: [ProfileTagModule],
  providers: [
    { provide: CdsConfig, useExisting: Config },
    provideConfigValidator(cdsConfigValidator),
  ],
})
export class CdsModule {}
=======
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
>>>>>>> 0fe6239ca0dba0daa1c20a718faeefc1e287e6d9
