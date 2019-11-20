import { ModuleWithProviders, NgModule } from '@angular/core';
import { CdsMerchandisingStrategyAdapter } from './adapters/index';
import { MerchandisingCarouselCmsModule } from './cms-components/index';
import {
  MerchandisingStrategyAdapter,
  MERCHANDISING_PRODUCTS_NORMALIZER,
  MERCHANDISING_PRODUCT_NORMALIZER,
} from './connectors/index';
import {
  MerchandisingProductNormalizer,
  MerchandisingProductsNormalizer,
} from './converters/index';

@NgModule({
  imports: [MerchandisingCarouselCmsModule],
  providers: [
    {
      provide: MerchandisingStrategyAdapter,
      useExisting: CdsMerchandisingStrategyAdapter,
    },
  ],
})
export class MerchandisingModule {
  static forRoot(): ModuleWithProviders<MerchandisingModule> {
    return {
      ngModule: MerchandisingModule,
      providers: [
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
