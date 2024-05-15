/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { CpqQuoteDiscountComponent } from './cpq-quote.component';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, IconModule],
  declarations: [CpqQuoteDiscountComponent],
  exports: [CpqQuoteDiscountComponent],
})
export class CpqQuoteTbodyModule {}
