/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
import { CommerceQuotesDetailsOverviewComponent } from './commerce-quotes-details-overview.component';

@NgModule({
  imports: [CommonModule, I18nModule, CardModule, SpinnerModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CommerceQuotesDetailsOverviewComponent: {
          component: CommerceQuotesDetailsOverviewComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CommerceQuotesDetailsOverviewComponent],
  exports: [CommerceQuotesDetailsOverviewComponent],
})
export class CommerceQuotesDetailsOverviewModule {}
