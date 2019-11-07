import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig, provideConfigValidator } from '@spartacus/core';
import { CdsConfig } from './cds-config';
import { cdsConfigValidator } from './cds-config-validator';
import { defaultCdsConfig } from './default-cds-config';
import { MerchandisingStrategyAdapter } from './merchandising/adapters/strategy/merchandising.strategy.adapter';
import { MERCHANDISING_PRODUCT_CONVERTER } from './merchandising/connectors/strategy/converters';
import { StrategyAdapter } from './merchandising/connectors/strategy/strategy.adapter';
import { MerchandisingProductConverter } from './merchandising/converters/merchandising-product-converter';

@NgModule()
export class CdsModule {
  static forRoot(): ModuleWithProviders<CdsModule> {
    return {
      ngModule: CdsModule,
      providers: [
        { provide: CdsConfig, useExisting: Config },
        { provide: StrategyAdapter, useClass: MerchandisingStrategyAdapter },
        {
          provide: MERCHANDISING_PRODUCT_CONVERTER,
          useClass: MerchandisingProductConverter,
          multi: true,
        },
        provideConfig(defaultCdsConfig),
        provideConfigValidator(cdsConfigValidator),
      ],
    };
  }
}
