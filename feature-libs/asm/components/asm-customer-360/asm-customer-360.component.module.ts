import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AsmCustomer360Component } from './asm-customer-360.component';
import { AsmCustomerMapComponentModule } from './asm-customer-map/asm-customer-map.component.module';
import { AsmCustomerActivityModule } from './asm-customer-activity/asm-customer-activity.module';
import { AsmCustomerOverviewModule } from './asm-customer-overview/asm-customer-overview.module';
import { AsmCustomerProfileModule } from './asm-customer-profile/asm-customer-profile.module';
import { AsmCustomerFeedbackModule } from './asm-customer-feedback/asm-customer-feedback.module';
import { AsmCustomerPromotionsModule } from './asm-customer-promotions/asm-customer-promotions.module';
import { IconModule, ModalModule } from '@spartacus/storefront';

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
    IconModule,
    ModalModule,
  ],
  declarations: [AsmCustomer360Component],
  exports: [AsmCustomer360Component],
})
export class AsmCustomer360ComponentModule {}
