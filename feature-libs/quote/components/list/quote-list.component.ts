/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { QuoteListComponentService } from './quote-list-component.service';
import {
  CxDatePipe,
  PaginationModel,
  TranslationService,
} from '@spartacus/core';
import { QuoteState } from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-quote-list',
  templateUrl: './quote-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CxDatePipe],
})
export class QuoteListComponent implements OnInit {
  protected quoteListComponentService = inject(QuoteListComponentService);
  protected translationService = inject(TranslationService);
  protected cxDatePipe = inject(CxDatePipe);

  sorts = this.quoteListComponentService.sortOptions;
  sortLabels$ = this.quoteListComponentService.sortLabels$;
  quotesState$ = this.quoteListComponentService.quotesState$;
  dateFormat: string = 'MMMM d, YYYY h:mm aa';
  iconTypes = ICON_TYPE;

  ngOnInit(): void {
    this.changePage(0);
    this.changeSorting(this.quoteListComponentService.defaultSortOption);
  }

  /**
   * Changes current sorting.
   *
   * @param sortCode - Identifies sort option that should be applied
   */
  changeSorting(sortCode: string): void {
    this.quoteListComponentService.setSorting(sortCode);
  }

  /**
   * Changes current page.
   *
   * @param page - Desired page number
   */
  changePage(page: number): void {
    this.quoteListComponentService.setPage(page);
  }

  /**
   * Retrieves the class name for the quote state. This class name is composed
   * using 'quote-' as prefix and the last part of the status name in lower case
   * (like e.g. draft for SELLER_DRAFT).
   *
   * @param state - quote state
   * @returns class name corresponding to quote state.
   */
  getQuoteStateClass(state: QuoteState): string {
    const stateAsString = state.toString();
    const indexSeparator = stateAsString.indexOf('_');
    //note: in case not found: indexSeparator is -1, lastPart will be stateAsString
    const lastPart = stateAsString.substring(indexSeparator + 1);
    return 'quote-' + lastPart.toLowerCase();
  }

  protected isPaginationEnabled(pagination: PaginationModel): boolean {
    return pagination.totalPages !== undefined && pagination.totalPages > 1;
  }
}
