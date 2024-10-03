/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { ReturnRequestItemsComponent } from './return-request-items/return-request-items.component';
import { ReturnRequestOverviewComponent } from './return-request-overview/return-request-overview.component';
import { ReturnRequestTotalsComponent } from './return-request-totals/return-request-totals.component';

const components = [
  ReturnRequestOverviewComponent,
  ReturnRequestItemsComponent,
  ReturnRequestTotalsComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule, MediaModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturnRequestOverviewComponent: {
          component: ReturnRequestOverviewComponent,
        },
        ReturnRequestItemsComponent: {
          component: ReturnRequestItemsComponent,
        },
        ReturnRequestTotalsComponent: {
          component: ReturnRequestTotalsComponent,
        },
      },
    }),
  ],
  declarations: [...components],
  exports: [...components],
})
export class ReturnRequestDetailModule {}
