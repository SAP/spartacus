/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { QuoteState } from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { QuoteListComponentService } from './quote-list-component.service';

@Component({
  selector: 'cx-quote-list',
  templateUrl: './quote-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteListComponent {
  protected quoteListComponentService = inject(QuoteListComponentService);

  sorts = this.quoteListComponentService.sorts;
  sortLabels$ = this.quoteListComponentService.sortLabels$;
  quotesState$ = this.quoteListComponentService.quotesState$;
  dateFormat: string = 'MMMM d, YYYY h:mm aa';
  iconTypes = ICON_TYPE;

  constructor() {
    this.changePage(0);
    this.changeSortCode('byCode');
  }

  changeSortCode(sortCode: string): void {
    this.quoteListComponentService.setSort(sortCode);
  }

  changePage(page: number): void {
    this.quoteListComponentService.setCurrentPage(page);
  }

  /**
   * Retrieves the class name for the quote state. This class name is composed
   * using 'quote-' as prefix and the last part of the status name in lower case
   * (like e.g. draft for SELLER_DRAFT)
   *
   * @param {QuoteState} state - quote state
   * @returns {string} - class name corresponding to quote state.
   */
  getQuoteStateClass(state: QuoteState): string {
    const stateAsString = state.toString();
    const indexSeparator = stateAsString.indexOf('_');
    //note: in case not found: indexSeparator is -1, lastPart will be stateAsString
    const lastPart = stateAsString.substring(indexSeparator + 1);
    return 'quote-' + lastPart.toLowerCase();
  }
}
