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
import { QuoteRequestQuoteButtonComponent } from './quote-request-quote-button.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [QuoteRequestQuoteButtonComponent],
  exports: [QuoteRequestQuoteButtonComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteRequestComponent: {
          component: QuoteRequestQuoteButtonComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class QuoteRequestQuoteButtonModule {}
