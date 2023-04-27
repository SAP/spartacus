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
import { CommerceQuotesRequestQuoteDialogComponent } from './commerce-quotes-request-quote-dialog.component';
import { defaultCommerceQuotesRequestQuoteDialogConfig } from './default-commerce-quotes-request-quote-dialog-config';
import { ConfirmQuoteRequestDialogComponent } from './confirm-request-quote-dialog/confirm-quote-request-dialog.component';

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
  providers: [
    provideDefaultConfig(defaultCommerceQuotesRequestQuoteDialogConfig),
  ],
  declarations: [
    CommerceQuotesRequestQuoteDialogComponent,
    ConfirmQuoteRequestDialogComponent,
  ],
  exports: [
    CommerceQuotesRequestQuoteDialogComponent,
    ConfirmQuoteRequestDialogComponent,
  ],
})
export class CommerceQuotesRequestQuoteDialogModule {}
