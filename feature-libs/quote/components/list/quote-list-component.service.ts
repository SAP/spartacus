/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { QueryState, SortModel, TranslationService } from '@spartacus/core';
import { QuoteFacade, QuoteList } from '@spartacus/quote/root';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Injectable()
export class QuoteListComponentService {
  protected quoteFacade = inject(QuoteFacade);
  protected translationService = inject(TranslationService);
  readonly defaultSortOption = 'byCode';

  protected sort = new BehaviorSubject(this.defaultSortOption);
  protected currentPage = new BehaviorSubject(0);

  //TODO: temporary solution caused by gaps in the API. Refer to
  //https://jira.tools.sap/browse/CXEC-31715
  sortOptions: SortModel[] = [
    { code: 'byDate' },
    { code: 'byCode' },
    { code: 'byName' },
    { code: 'byState' },
  ];

  quotesState$: Observable<QueryState<QuoteList | undefined>> = this.quoteFacade
    .getQuotesState({
      currentPage$: this.currentPage
        .asObservable()
        .pipe(distinctUntilChanged()),
      sort$: this.sort.asObservable().pipe(distinctUntilChanged()),
    })
    .pipe(
      tap((quotesState: QueryState<QuoteList | undefined>) => {
        if (quotesState.data?.sorts) {
          this.sortOptions = quotesState.data.sorts;
        }
      })
    );

  sortLabels$: Observable<{ [key: string]: string }> = combineLatest([
    this.translationService.translate('sorting.date'),
    this.translationService.translate('quote.list.quoteId'),
    this.translationService.translate('quote.list.name'),
    this.translationService.translate('quote.list.status'),
  ]).pipe(
    map(
      ([
        textByQuoteUpdatedDate,
        textByQuoteCode,
        textByQuoteName,
        textByQuoteStatus,
      ]) => {
        return {
          byDate: textByQuoteUpdatedDate,
          byCode: textByQuoteCode,
          byName: textByQuoteName,
          byState: textByQuoteStatus,
        };
      }
    )
  );

  /**
   * Sets sorting for quote list.
   *
   * @param sort - Code of desired sort option that will be applied to the quote list
   */
  setSorting(sort: string): void {
    this.sort.next(sort);
  }

  /**
   * Sets current page.
   *
   * @param page - number of page that will be applied to the quote list
   */
  setPage(page: number): void {
    this.currentPage.next(page);
  }
}
