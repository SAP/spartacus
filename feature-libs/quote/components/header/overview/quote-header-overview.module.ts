/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import {
  CardModule,
  IconModule,
  KeyboardFocusModule,
} from '@spartacus/storefront';
import { QuoteHeaderOverviewComponent } from './quote-header-overview.component';
import { QuoteHeaderBuyerEditModule } from '../buyer-edit/quote-header-buyer-edit.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    CardModule,
    QuoteHeaderBuyerEditModule,
    KeyboardFocusModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteHeaderOverviewComponent: {
          component: QuoteHeaderOverviewComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteHeaderOverviewComponent],
  exports: [QuoteHeaderOverviewComponent],
})
export class QuoteHeaderOverviewModule {}
