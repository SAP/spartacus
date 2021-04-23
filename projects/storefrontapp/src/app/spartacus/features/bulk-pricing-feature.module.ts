import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  bulkPricingTranslationChunksConfig,
  bulkPricingTranslations,
} from '@spartacus/product/bulk-pricing/assets';
import { BulkPricingRootModule } from '@spartacus/product/bulk-pricing/root';

@NgModule({
  imports: [BulkPricingRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        productBulkPricing: {
          module: () =>
            import('@spartacus/product/bulk-pricing').then(
              (m) => m.BulkPricingModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: bulkPricingTranslations,
        chunks: bulkPricingTranslationChunksConfig,
      },
    }),
  ],
})
export class BulkPricingFeatureModule {}
