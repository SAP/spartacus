/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import {
  DatePickerModule,
  FormErrorsModule,
  NgSelectA11yModule,
} from '@spartacus/storefront';
import { AccountSummaryDocumentFilterComponent } from './account-summary-document-filter.component';

@NgModule({
  declarations: [AccountSummaryDocumentFilterComponent],
  imports: [
    CommonModule,
    I18nModule,
    NgSelectModule,
    NgSelectA11yModule,
    ReactiveFormsModule,
    DatePickerModule,
    FormErrorsModule,
    FeaturesConfigModule,
  ],
  exports: [AccountSummaryDocumentFilterComponent],
})
export class AccountSummaryDocumentFilterModule {}
