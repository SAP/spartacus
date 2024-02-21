/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { QuoteHeaderBuyerEditComponent } from './quote-header-buyer-edit.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
  ],
  declarations: [QuoteHeaderBuyerEditComponent],
  exports: [QuoteHeaderBuyerEditComponent],
})
export class QuoteHeaderBuyerEditModule {}
