/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { SubscriptionDetailsComponent } from './subscription-details.component';
import { SpinnerModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule, RouterModule, SpinnerModule],
  declarations: [SubscriptionDetailsComponent],
  exports: [SubscriptionDetailsComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SubscriptionDetailsComponent: {
          component: SubscriptionDetailsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class SubscriptionDetailsModule {}
