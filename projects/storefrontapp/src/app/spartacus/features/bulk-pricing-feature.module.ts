import { NgModule } from '@angular/core';
import { BulkPricingRootModule } from '@spartacus/product/bulk-pricing/root';
import { provideConfig } from '@spartacus/core';
import {
  bulkPricingTranslationChunksConfig,
  bulkPricingTranslations,
} from '@spartacus/product/bulk-pricing/assets';

@NgModule({
  imports: [BulkPricingRootModule],
  providers: [
    provideConfig({
      featureModules: {
        productBulkPricing: {
          module: () =>
            import('@spartacus/product/bulk-pricing').then(
              (m) => m.BulkPricingModule
            ),
        },
      },
      i18n: {
        resources: bulkPricingTranslations,
        chunks: bulkPricingTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class BulkPricingFeatureModule {}
