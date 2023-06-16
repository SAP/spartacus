/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { QuoteFacade, QuoteList } from '@spartacus/commerce-quotes/root';
import { QueryState, SortModel, TranslationService } from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Injectable()
export class CommerceQuotesListComponentService {
  protected sort = new BehaviorSubject('byCode');
  protected currentPage = new BehaviorSubject(0);

  //TODO: temporary solution caused by gaps in the API
  sorts: SortModel[] = [
    { code: 'byDate' },
    { code: 'byCode' },
    { code: 'byName' },
    { code: 'byState' },
  ];

  quotesState$: Observable<QueryState<QuoteList | undefined>> =
    this.commerceQuotesFacade
      .getQuotesState({
        currentPage$: this.currentPage
          .asObservable()
          .pipe(distinctUntilChanged()),
        sort$: this.sort.asObservable().pipe(distinctUntilChanged()),
      })
      .pipe(
        tap((quotesState: QueryState<QuoteList | undefined>) => {
          if (quotesState.data?.sorts) {
            console.warn(
              'Quote list sorts has been received from the API, but static values are still in use.'
            );
            this.sorts = quotesState.data.sorts;
          }
        })
      );

  sortLabels$: Observable<{ [key: string]: string }> = combineLatest([
    this.translationService.translate('sorting.date'),
    this.translationService.translate('sorting.quoteId'),
    this.translationService.translate('sorting.name'),
    this.translationService.translate('sorting.status'),
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

  constructor(
    protected commerceQuotesFacade: QuoteFacade,
    protected translationService: TranslationService
  ) {}

  setSort(sort: string): void {
    this.sort.next(sort);
  }

  setCurrentPage(page: number): void {
    this.currentPage.next(page);
  }
}
