/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuoteState } from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { QuoteListComponentService } from './quote-list-component.service';

@Component({
  selector: 'cx-quote-list',
  templateUrl: './quote-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteListComponent {
  sorts = this.quoteListService.sorts;
  sortLabels$ = this.quoteListService.sortLabels$;
  quotesState$ = this.quoteListService.quotesState$;
  dateFormat: string = 'MMMM d, YYYY h:mm aa';
  iconTypes = ICON_TYPE;

  constructor(protected quoteListService: QuoteListComponentService) {
    this.changePage(0);
    this.changeSortCode('byCode');
  }

  changeSortCode(sortCode: string): void {
    this.quoteListService.setSort(sortCode);
  }

  changePage(page: number): void {
    this.quoteListService.setCurrentPage(page);
  }

  /**
   * Retrieves the class name for the quote state.
   *
   * @param {QuoteState} state - quote state
   * @returns {string} - class name corresponding to quote state
   */
  getQuoteStateClass(state: QuoteState): string {
    switch (state) {
      case QuoteState.BUYER_DRAFT:
      case QuoteState.SELLER_DRAFT:
      case QuoteState.SELLERAPPROVER_DRAFT:
        return 'quote-draft';
      case QuoteState.BUYER_SUBMITTED:
      case QuoteState.SELLER_SUBMITTED:
        return 'quote-submitted';
      case QuoteState.BUYER_ACCEPTED:
        return 'quote-accepted';
      case QuoteState.BUYER_APPROVED:
      case QuoteState.SELLERAPPROVER_APPROVED:
        return 'quote-approved';
      case QuoteState.SELLERAPPROVER_REJECTED:
      case QuoteState.BUYER_REJECTED:
        return 'quote-rejected';
      case QuoteState.BUYER_OFFER:
        return 'quote-offer';
      case QuoteState.BUYER_ORDERED:
        return 'quote-ordered';
      case QuoteState.SELLER_REQUEST:
        return 'quote-request';
      case QuoteState.SELLERAPPROVER_PENDING:
        return 'quote-pending';
      case QuoteState.CANCELLED:
        return 'quote-cancelled';
      case QuoteState.CREATED:
        return 'quote-created';
      case QuoteState.EXPIRED:
        return 'quote-expired';
    }
  }
}
