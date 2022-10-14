import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AsmCustomer360Component } from './asm-customer-360.component';
import { AsmCustomerMapComponentModule } from './sections/asm-customer-map/asm-customer-map.component.module';
import { AsmCustomerActivityModule } from './sections/asm-customer-activity/asm-customer-activity.module';
import { AsmCustomerOverviewModule } from './sections/asm-customer-overview/asm-customer-overview.module';
import { AsmCustomerProfileModule } from './sections/asm-customer-profile/asm-customer-profile.module';
import { AsmCustomerPromotionsModule } from './sections/asm-customer-promotions/asm-customer-promotions.module';
import { AsmCustomerSupportTicketsComponentModule } from './sections/asm-customer-support-tickets/asm-customer-support-tickets.component.module';
import { AsmCustomerProductReviewsComponentModule } from './sections/asm-customer-product-reviews/asm-customer-product-reviews.component.module';
import { IconModule, KeyboardFocusModule, PageComponentModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    PageComponentModule,
    AsmCustomerOverviewModule,
    AsmCustomerProfileModule,
    AsmCustomerActivityModule,
    AsmCustomerPromotionsModule,
    AsmCustomerMapComponentModule,
    AsmCustomerSupportTicketsComponentModule,
    AsmCustomerProductReviewsComponentModule,
  ],
  declarations: [AsmCustomer360Component],
  exports: [AsmCustomer360Component],
})
export class AsmCustomer360ComponentModule {}
