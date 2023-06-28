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
import { QuoteRequestDialogComponent } from './quote-request-dialog.component';
import { defaultQuoteRequestDialogConfig } from './default-quote-request-dialog-config';
import { QuoteConfirmRequestDialogComponent } from './quote-confirm-request-dialog/quote-confirm-request-dialog.component';

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
  providers: [provideDefaultConfig(defaultQuoteRequestDialogConfig)],
  declarations: [
    QuoteRequestDialogComponent,
    QuoteConfirmRequestDialogComponent,
  ],
  exports: [QuoteRequestDialogComponent, QuoteConfirmRequestDialogComponent],
})
export class QuoteRequestDialogModule {}
