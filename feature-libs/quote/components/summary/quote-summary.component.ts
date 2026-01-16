/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { QuoteFacade } from '@spartacus/quote/root';
import { QuoteSummaryActionsComponent } from './actions/quote-summary-actions.component';
import { QuoteSummaryPricesComponent } from './prices/quote-summary-prices.component';
import { QuoteSummarySellerEditComponent } from './seller-edit/quote-summary-seller-edit.component';

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
