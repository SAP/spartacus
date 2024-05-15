/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { quoteOutlet } from '@spartacus/cart/base/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { CpqQuoteHeadingComponent } from './components/cpq-quote-heading/cpq-quote-heading.component';
import { CpqQuoteHeadingModule } from './components/cpq-quote-heading/cpq-quote.heading.module';
import { CpqQuoteTbodyModule } from './components/cpq-quote-discount-tbody/cpq-quote.tbody.module';
import { CpqQuoteDiscountComponent } from './components/cpq-quote-discount-tbody/cpq-quote.component';
@NgModule({
  imports: [CpqQuoteHeadingModule, CpqQuoteTbodyModule],
  providers: [
    provideOutlet({
      id: quoteOutlet.CPQ_QUOTE_MODULE,
      position: OutletPosition.AFTER,
      component: CpqQuoteDiscountComponent,
    }),
    provideOutlet({
      id: quoteOutlet.CPQ_QUOTE_HEADING,
      position: OutletPosition.AFTER,
      component: CpqQuoteHeadingComponent,
    }),
  ],
})
export class CpqQuoteRootdModule {}
