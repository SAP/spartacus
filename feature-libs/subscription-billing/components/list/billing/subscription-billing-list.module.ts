/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { SubscriptionBillingListComponent } from './subscription-billing-list.component';
import { DateRangeModalComponent } from './date-range-modal/date-range-modal.component';
import {
  DatePickerModule,
  FormErrorsModule,
  ListNavigationModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { dateRangeModalConfig } from './date-range-modal/date-range-modal.config';

@NgModule({
  imports: [
    I18nModule,
    UrlModule,
    ListNavigationModule,
    RouterModule,
    SpinnerModule,
    CommonModule,
    DatePickerModule,
    FormErrorsModule,
    ReactiveFormsModule,
    SubscriptionBillingListComponent,
    DateRangeModalComponent,
  ],
  exports: [SubscriptionBillingListComponent, DateRangeModalComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SubscriptionBillsHistoryComponent: {
          component: SubscriptionBillingListComponent,
          guards: [AuthGuard],
        },
      },
    }),
    provideDefaultConfig(dateRangeModalConfig),
  ],
})
export class SubscriptionBillingListModule {}
