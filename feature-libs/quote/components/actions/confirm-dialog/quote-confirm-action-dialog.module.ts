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
import { defaultQuoteActionDialogConfig } from './default-quote-confirm-action-dialog-config';
import { QuoteConfirmActionDialogComponent } from './quote-confirm-action-dialog.component';

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
  providers: [provideDefaultConfig(defaultQuoteActionDialogConfig)],
  declarations: [QuoteConfirmActionDialogComponent],
  exports: [QuoteConfirmActionDialogComponent],
})
export class QuoteConfirmActionDialogModule {}
