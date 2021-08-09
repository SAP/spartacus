import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_BULK_PRICING_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultProductBulkPricingComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [PRODUCT_BULK_PRICING_FEATURE]: {
        cmsComponents: ['BulkPricingTableComponent'],
      },
    },
  };

  return config;
}

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfigFactory(defaultProductBulkPricingComponentsConfig),
  ],
})
export class BulkPricingRootModule {}
