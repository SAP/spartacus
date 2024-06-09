/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  IconModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { CpqQuoteHeadingComponent } from './components/cpq-quote-heading/cpq-quote-heading.component';
import { CpqQuoteDiscountComponent } from './components/cpq-quote-discount-tbody/cpq-quote.component';
import { CpqQuoteOfferComponent } from './components/cpq-quote/cpq-quote-offer.component';

import { CommonModule } from '@angular/common';
import { I18nModule, UrlModule } from '@spartacus/core';
import { QuoteOutlet } from '@spartacus/quote/root';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, IconModule],

  declarations: [
    CpqQuoteHeadingComponent,
    CpqQuoteDiscountComponent,
    CpqQuoteOfferComponent,
  ],
  exports: [
    CpqQuoteHeadingComponent,
    CpqQuoteDiscountComponent,
    CpqQuoteOfferComponent,
  ],
  providers: [
    provideOutlet({
      id: QuoteOutlet.CPQ_QUOTE_MODULE,
      position: OutletPosition.AFTER,
      component: CpqQuoteDiscountComponent,
    }),
    provideOutlet({
      id: QuoteOutlet.CPQ_QUOTE_HEADING,
      position: OutletPosition.AFTER,
      component: CpqQuoteHeadingComponent,
    }),
    provideOutlet({
      id: QuoteOutlet.CPQ_QUOTE,
      position: OutletPosition.AFTER,
      component: CpqQuoteOfferComponent,
    }),
  ],
})
export class CpqDiscountModule {}
