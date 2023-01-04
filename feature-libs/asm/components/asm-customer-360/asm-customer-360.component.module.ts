/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { AsmCustomer360Component } from './asm-customer-360.component';
import { AsmCustomerMapComponentModule } from './sections/asm-customer-map/asm-customer-map.component.module';
import { AsmCustomerActivityModule } from './sections/asm-customer-activity/asm-customer-activity.module';
import { AsmCustomerOverviewModule } from './sections/asm-customer-overview/asm-customer-overview.module';
import { AsmCustomerProfileModule } from './sections/asm-customer-profile/asm-customer-profile.module';
import { AsmCustomerProductReviewsComponentModule } from './sections/asm-customer-product-reviews/asm-customer-product-reviews.component.module';
import {
  IconModule,
  KeyboardFocusModule,
  PageComponentModule,
} from '@spartacus/storefront';
import { AsmCustomerSectionComponent } from './sections/asm-customer-section/asm-customer-section.component';
import {
  AsmCustomerActivityComponent,
  AsmCustomerMapComponent,
  AsmCustomerOverviewComponent,
  AsmCustomerProductReviewsComponent,
  AsmCustomerProfileComponent,
} from './sections/components';

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
    AsmCustomerMapComponentModule,
    AsmCustomerProductReviewsComponentModule,
  ],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        AsmCustomer360OverviewComponent: {
          component: AsmCustomerOverviewComponent,
        },
        AsmCustomer360ProfileComponent: {
          component: AsmCustomerProfileComponent,
        },
        AsmCustomer360ProductReviewsComponent: {
          component: AsmCustomerProductReviewsComponent,
        },
        AsmCustomer360CustomerActivityComponent: {
          component: AsmCustomerActivityComponent,
        },
        AsmCustomer360MapComponent: {
          component: AsmCustomerMapComponent,
        },
      },
    }),
  ],
  declarations: [AsmCustomer360Component, AsmCustomerSectionComponent],
  exports: [AsmCustomer360Component],
})
export class AsmCustomer360ComponentModule {}
