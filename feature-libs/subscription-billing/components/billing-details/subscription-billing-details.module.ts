/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionBillingDetailsComponent } from './subscription-billing-details.component';
import {
  provideDefaultConfig,
  CmsConfig,
  AuthGuard,
  UrlModule,
  I18nModule,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule, SpinnerModule],
  declarations: [SubscriptionBillingDetailsComponent],
  exports: [SubscriptionBillingDetailsComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SubscriptionBillDetailsComponent: {
          component: SubscriptionBillingDetailsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class SubscriptionBillingDetailsModule {}
