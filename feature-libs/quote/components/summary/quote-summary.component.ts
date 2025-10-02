/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { QuoteFacade } from '@spartacus/quote/root';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { QuoteSummaryPricesComponent } from './prices/quote-summary-prices.component';
import { QuoteSummarySellerEditComponent } from './seller-edit/quote-summary-seller-edit.component';
import { QuoteSummaryActionsComponent } from './actions/quote-summary-actions.component';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-quote-summary',
  templateUrl: 'quote-summary.component.html',
  imports: [
    NgIf,
    QuoteSummaryPricesComponent,
    QuoteSummarySellerEditComponent,
    QuoteSummaryActionsComponent,
    NgFor,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class QuoteSummaryComponent {
  protected quoteFacade = inject(QuoteFacade);

  quoteDetails$ = this.quoteFacade.getQuoteDetails();
}
