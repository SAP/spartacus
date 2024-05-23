/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { QuoteSummaryActionsComponent } from './quote-summary-actions.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [QuoteSummaryActionsComponent],
  exports: [QuoteSummaryActionsComponent],
})
export class QuoteSummaryActionsModule {}
