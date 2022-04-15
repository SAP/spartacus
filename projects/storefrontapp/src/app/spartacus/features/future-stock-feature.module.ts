import { NgModule } from '@angular/core';
import {
  futureStockTranslationChunksConfig,
  futureStockTranslations,
} from '@spartacus/product/future-stock/assets';
import {
  FutureStockRootModule,
} from '@spartacus/product/future-stock/root';
import { provideConfig } from '@spartacus/core';
// TODO: fix this import
import { PRODUCT_FUTURE_STOCK_FEATURE } from 'feature-libs/product/future-stock/root/feature-name';

@NgModule({
  imports: [FutureStockRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [PRODUCT_FUTURE_STOCK_FEATURE]: {
          module: () =>
            import('@spartacus/product/future-stock').then(
              (m) => m.FutureStockModule
            ),
        },
      },
      i18n: {
        resources: futureStockTranslations,
        chunks: futureStockTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class FutureStockFeatureModule {}
