/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { QuoteFacade } from '@spartacus/quote/root';
import { I18nModule } from '@spartacus/core';
import { QuoteSummaryActionsComponent } from './actions/quote-summary-actions.component';
import { QuoteSummarySellerEditComponent } from './seller-edit/quote-summary-seller-edit.component';
import { QuoteSummaryPricesComponent } from './prices/quote-summary-prices.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-quote-summary',
    templateUrl: 'quote-summary.component.html',
    standalone: true,
    imports: [
        NgIf,
        QuoteSummaryPricesComponent,
        QuoteSummarySellerEditComponent,
        QuoteSummaryActionsComponent,
        NgFor,
        AsyncPipe,
        I18nModule,
    ],
})
export class QuoteSummaryComponent {
  protected quoteFacade = inject(QuoteFacade);

  quoteDetails$ = this.quoteFacade.getQuoteDetails();
}
