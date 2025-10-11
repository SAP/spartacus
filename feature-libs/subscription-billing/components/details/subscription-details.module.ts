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
import { ExtendSubscriptionDialogComponent } from './extend-subscription/extend-subscription-dialog.component';
import {
  FormRequiredAsterisksComponent,
  IconModule,
  KeyboardFocusModule,
} from '@spartacus/storefront';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    RouterModule,
    SpinnerModule,
    IconModule,
    NgSelectModule,
    FormRequiredAsterisksComponent,
    KeyboardFocusModule,
  ],
  declarations: [
    SubscriptionDetailsComponent,
    ExtendSubscriptionDialogComponent,
  ],
  exports: [SubscriptionDetailsComponent, ExtendSubscriptionDialogComponent],
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
