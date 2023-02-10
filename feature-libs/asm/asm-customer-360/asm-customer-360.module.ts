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
import { AsmCustomerProfileModule } from './sections/asm-customer-profile/asm-customer-profile.module';
import { AsmCustomerProductReviewsComponentModule } from './sections/asm-customer-product-reviews/asm-customer-product-reviews.component.module';
import {
  IconModule,
  KeyboardFocusModule,
  PageComponentModule,
} from '@spartacus/storefront';
import { AsmCustomerSectionComponent } from './sections/asm-customer-section/asm-customer-section.component';
import {
  AsmCustomerActiveCartComponent,
  AsmCustomerActivityComponent,
  AsmCustomerMapComponent,
  AsmCustomerProductInterestsComponent,
  AsmCustomerProductReviewsComponent,
  AsmCustomerProfileComponent,
  AsmCustomerSavedCartComponent,
} from './sections/components';
import { AsmCustomerProductInterestsModule } from './sections/asm-customer-product-interests/asm-customer-product-interests.module';
import { AsmCustomerActiveCartModule } from './sections/asm-customer-active-cart/asm-customer-active-cart.module';
import { AsmCustomerSavedCartModule } from './sections/asm-customer-saved-cart/asm-customer-saved-cart.module';
import { facadeProviders } from './services/facade-providers';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    PageComponentModule,
    AsmCustomerActiveCartModule,
    AsmCustomerProductInterestsModule,
    AsmCustomerSavedCartModule,
    AsmCustomerProfileModule,
    AsmCustomerActivityModule,
    AsmCustomerMapComponentModule,
    AsmCustomerProductReviewsComponentModule,
  ],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        AsmCustomer360Component: {
          component: AsmCustomer360Component,
        },
        AsmCustomer360ProfileComponent: {
          component: AsmCustomerProfileComponent,
        },
        AsmCustomer360ActiveCartComponent: {
          component: AsmCustomerActiveCartComponent,
        },
        AsmCustomer360ProductInterestsComponent: {
          component: AsmCustomerProductInterestsComponent,
        },
        AsmCustomer360ProductReviewsComponent: {
          component: AsmCustomerProductReviewsComponent,
        },
        AsmCustomer360SavedCartComponent: {
          component: AsmCustomerSavedCartComponent,
        },
        AsmCustomer360CustomerActivityComponent: {
          component: AsmCustomerActivityComponent,
        },
        AsmCustomer360MapComponent: {
          component: AsmCustomerMapComponent,
        },
      },
    }),
    ...facadeProviders,
  ],
  declarations: [AsmCustomer360Component, AsmCustomerSectionComponent],
  exports: [AsmCustomer360Component],
})
export class AsmCustomer360Module {}
