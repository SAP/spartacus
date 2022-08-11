import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { BulkPricingTableComponent } from './bulk-pricing-table.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        BulkPricingTableComponent: {
          component: BulkPricingTableComponent,
        },
      },
    }),
  ],
  declarations: [BulkPricingTableComponent],
  exports: [BulkPricingTableComponent],
})
export class BulkPricingTableModule {}
