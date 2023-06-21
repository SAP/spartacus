/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { QuoteDetailsOverviewComponent } from './quote-details-overview.component';

@NgModule({
  imports: [CommonModule, I18nModule, CardModule, SpinnerModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteDetailsOverviewComponent: {
          component: QuoteDetailsOverviewComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteDetailsOverviewComponent],
  exports: [QuoteDetailsOverviewComponent],
})
export class QuoteDetailsOverviewModule {}
