import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfig({
      featureModules: {
        productBulkPricing: {
          cmsComponents: ['BulkPricingTableComponent'],
        },
      },
    }),
  ],
})
export class BulkPricingRootModule {}
