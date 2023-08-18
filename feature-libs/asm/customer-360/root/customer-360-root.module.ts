/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ASM_FEATURE } from '@spartacus/asm/root';
import { provideDefaultConfig } from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import { Customer360DialogComponent } from './components/customer-360-dialog/customer-360-dialog.component';
import { defaultCustomer360LayoutConfig } from './components/default-customer-360-layout.config';
import { defaultCustomer360Config } from './config';
import {
  CUSTOMER_360_CORE_FEATURE,
  CUSTOMER_360_FEATURE,
} from './feature-name';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SiteContextInterceptor } from './interceptors/site-context.interceptor';

@NgModule({
  imports: [PageComponentModule],
  providers: [
    provideDefaultConfig(defaultCustomer360Config),
    provideDefaultConfig(defaultCustomer360LayoutConfig),
    provideDefaultConfig({
      featureModules: {
        [CUSTOMER_360_FEATURE]: {
          cmsComponents: [
            'AsmCustomer360Component',
            'AsmCustomer360ProfileComponent',
            'AsmCustomer360CustomerActivityComponent',
            'AsmCustomer360ActiveCartComponent',
            'AsmCustomer360SavedCartComponent',
            'AsmCustomer360ProductInterestsComponent',
            'AsmCustomer360ProductReviewsComponent',
            'AsmCustomer360SupportTicketsComponent',
            'AsmCustomer360MapComponent',
            'AsmCustomer360CouponComponent',
            'AsmCustomer360PromotionComponent',
            'AsmCustomer360CustomerCouponComponent',
          ],
          dependencies: [ASM_FEATURE],
        },
        [CUSTOMER_360_CORE_FEATURE]: CUSTOMER_360_FEATURE,
      },
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: SiteContextInterceptor,
      multi: true,
    },
  ],
  declarations: [Customer360DialogComponent],
  exports: [Customer360DialogComponent],
})
export class Customer360RootModule {}
