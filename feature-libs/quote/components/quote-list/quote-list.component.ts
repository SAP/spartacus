/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuoteRoleService } from '@spartacus/quote/core';
import { QuoteRoleType, QuoteState } from '@spartacus/quote/root';
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

  constructor(
    protected quoteListService: QuoteListComponentService,
    protected quoteRoleService: QuoteRoleService
  ) {
    this.changePage(0);
    this.changeSortCode('byCode');
  }

  changeSortCode(sortCode: string): void {
    this.quoteListService.setSort(sortCode);
  }

  changePage(page: number): void {
    this.quoteListService.setCurrentPage(page);
  }

  protected getBuyerQuoteStatus(state: QuoteState): string {
    switch (state) {
      case QuoteState.BUYER_DRAFT:
        return 'quote-draft';
      case QuoteState.BUYER_SUBMITTED:
        return 'quote-submitted';
      case QuoteState.BUYER_ACCEPTED:
        return 'quote-accepted';
      case QuoteState.BUYER_APPROVED:
        return 'quote-approved';
      case QuoteState.BUYER_REJECTED:
        return 'quote-rejected';
      case QuoteState.BUYER_OFFER:
        return 'quote-offer';
      case QuoteState.BUYER_ORDERED:
        return 'quote-ordered';
      default:
        return '';
    }
  }

  protected getSellerQuoteStatus(state: QuoteState): string {
    switch (state) {
      case QuoteState.SELLER_DRAFT:
        return 'quote-draft';
      case QuoteState.SELLER_SUBMITTED:
        return 'quote-submitted';
      case QuoteState.SELLER_REQUEST:
        return 'quote-request';
      default:
        return '';
    }
  }

  protected getSellerApproverQuoteStatus(state: QuoteState): string {
    switch (state) {
      case QuoteState.SELLERAPPROVER_APPROVED:
        return 'quote-approved';
      case QuoteState.SELLERAPPROVER_REJECTED:
        return 'quote-rejected';
      case QuoteState.SELLERAPPROVER_PENDING:
        return 'quote-pending';
      default:
        return '';
    }
  }

  protected getGeneralQuoteStatus(state: QuoteState): string {
    switch (state) {
      case QuoteState.CANCELLED:
        return 'quote-cancelled';
      case QuoteState.EXPIRED:
        return 'quote-expired';
      default:
        return '';
    }
  }

  /**
   * Retrieves the class name for the quote state.
   *
   * @param {QuoteState} state - quote state
   * @returns {string} - if the quote state is known then returns a class name, otherwise returns an empty string.
   */
  getQuoteStateClass(state: QuoteState): string {
    const role: QuoteRoleType = this.quoteRoleService.stateToRole(state);
    switch (role) {
      case QuoteRoleType.BUYER:
        return this.getBuyerQuoteStatus(state);
      case QuoteRoleType.SELLER:
        return this.getSellerQuoteStatus(state);
      case QuoteRoleType.SELLERAPPROVER:
        return this.getSellerApproverQuoteStatus(state);
      default:
        return this.getGeneralQuoteStatus(state);
    }
  }
}
