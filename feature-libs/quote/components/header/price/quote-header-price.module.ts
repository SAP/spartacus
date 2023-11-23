/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { QuoteHeaderPriceComponent } from './quote-header-price.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [QuoteHeaderPriceComponent],
  exports: [QuoteHeaderPriceComponent],
})
export class QuoteHeaderPriceModule {}
