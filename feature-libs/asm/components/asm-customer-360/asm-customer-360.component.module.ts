import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  CardModule,
  MediaModule,
  StarRatingModule,
} from '@spartacus/storefront';
import { AsmCustomerActivityComponent } from './asm-customer-activity/asm-customer-activity.component';
import { AsmCustomerFeedbackComponent } from './asm-customer-feedback/asm-customer-feedback.component';
import { AsmCustomerPromotionsComponent } from './asm-customer-promotions/asm-customer-promotions.component';
import { AsmCustomerListingComponent } from './asm-customer-ui-components/asm-customer-listing/asm-customer-listing.component';
import { AsmCustomerTableComponent } from './asm-customer-ui-components/asm-customer-table/asm-customer-table.component';
import { AsmCustomer360Component } from './asm-customer-360.component';
import { AsmCustomerMapComponentModule } from './asm-customer-map/asm-customer-map.component.module';
import { AsmCustomerOverviewComponent } from './asm-customer-overview/asm-customer-overview.component';
import { AsmProductItemComponent } from './asm-customer-overview/asm-product-item/asm-product-item.component';
import { AsmCustomerProfileComponent } from './asm-customer-profile/asm-customer-profile.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    CardModule,
    MediaModule,
    RouterModule,
    UrlModule,
    StarRatingModule,
    AsmCustomerMapComponentModule,
  ],
  declarations: [
    AsmCustomer360Component,
    AsmCustomerListingComponent,
    AsmCustomerTableComponent,
    AsmCustomerActivityComponent,
    AsmCustomerFeedbackComponent,
    AsmCustomerPromotionsComponent,
    AsmCustomerProfileComponent,
    AsmCustomerOverviewComponent,
    AsmProductItemComponent,
  ],
  exports: [
    AsmCustomer360Component,
    AsmCustomerListingComponent,
    AsmCustomerTableComponent,
    AsmCustomerActivityComponent,
    AsmCustomerFeedbackComponent,
    AsmCustomerPromotionsComponent,
    AsmCustomerProfileComponent,
    AsmCustomerOverviewComponent,
    AsmProductItemComponent,
  ],
})
export class AsmCustomer360ComponentModule {}
