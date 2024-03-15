/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { QuoteSummarySellerEditComponent } from './quote-summary-seller-edit.component';
import { IconModule, DatePickerModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    DatePickerModule,
  ],
  declarations: [QuoteSummarySellerEditComponent],
  exports: [QuoteSummarySellerEditComponent],
})
export class QuoteSummarySellerEditModule {}
