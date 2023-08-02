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
import { QuoteAwareComponent } from './quote-aware.component';
import { QuoteCartGuard } from '@spartacus/quote/root';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteAwareComponent: {
          component: QuoteAwareComponent,
          guards: [AuthGuard, QuoteCartGuard],
        },
      },
    }),
  ],
  declarations: [QuoteAwareComponent],
  exports: [QuoteAwareComponent],
})
export class QuoteAwareComponentModule {}
