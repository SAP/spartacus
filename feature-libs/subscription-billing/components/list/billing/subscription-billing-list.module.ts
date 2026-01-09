/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { ListNavigationModule, SpinnerModule } from '@spartacus/storefront';
import { SubscriptionBillingListComponent } from './subscription-billing-list.component';

@NgModule({
  imports: [
    I18nModule,
    UrlModule,
    ListNavigationModule,
    RouterModule,
    SpinnerModule,
    CommonModule,
  ],
  declarations: [SubscriptionBillingListComponent],
  exports: [SubscriptionBillingListComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SubscriptionBillsHistoryComponent: {
          component: SubscriptionBillingListComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class SubscriptionBillingListModule {}
