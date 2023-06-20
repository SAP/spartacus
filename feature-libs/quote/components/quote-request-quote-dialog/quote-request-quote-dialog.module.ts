/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import {
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { QuoteRequestQuoteDialogComponent } from './quote-request-quote-dialog.component';
import { defaultQuoteRequestQuoteDialogConfig } from './default-quote-request-quote-dialog-config';
import { QuoteConfirmQuoteRequestDialogComponent } from './confirm-request-quote-dialog/quote-confirm-quote-request-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsModule,
    RouterModule,
    KeyboardFocusModule,
    SpinnerModule,
  ],
  providers: [provideDefaultConfig(defaultQuoteRequestQuoteDialogConfig)],
  declarations: [
    QuoteRequestQuoteDialogComponent,
    QuoteConfirmQuoteRequestDialogComponent,
  ],
  exports: [
    QuoteRequestQuoteDialogComponent,
    QuoteConfirmQuoteRequestDialogComponent,
  ],
})
export class QuoteRequestQuoteDialogModule {}
