import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AsmCustomer360Component } from './asm-customer-360.component';
import { AsmCustomerMapComponentModule } from './sections/asm-customer-map/asm-customer-map.component.module';
import { AsmCustomerActivityModule } from './sections/asm-customer-activity/asm-customer-activity.module';
import { AsmCustomerOverviewModule } from './sections/asm-customer-overview/asm-customer-overview.module';
import { AsmCustomerProfileModule } from './sections/asm-customer-profile/asm-customer-profile.module';
import { AsmCustomerFeedbackModule } from './sections/asm-customer-feedback/asm-customer-feedback.module';
import { AsmCustomerPromotionsModule } from './sections/asm-customer-promotions/asm-customer-promotions.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    AsmCustomerOverviewModule,
    AsmCustomerProfileModule,
    AsmCustomerActivityModule,
    AsmCustomerFeedbackModule,
    AsmCustomerPromotionsModule,
    AsmCustomerMapComponentModule,
  ],
  declarations: [AsmCustomer360Component],
  exports: [AsmCustomer360Component],
})
export class AsmCustomer360ComponentModule {}
