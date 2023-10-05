/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { QuoteFacade, QuoteList } from '@spartacus/quote/root';
import { QueryState, SortModel, TranslationService } from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Injectable()
export class QuoteListComponentService {
  protected sort = new BehaviorSubject('byCode');
  protected currentPage = new BehaviorSubject(0);

  //TODO: temporary solution caused by gaps in the API. Refer to
  //https://jira.tools.sap/browse/CXEC-31715
  sorts: SortModel[] = [
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
    protected quoteFacade: QuoteFacade,
    protected translationService: TranslationService
  ) {}

  setSort(sort: string): void {
    this.sort.next(sort);
  }

  setCurrentPage(page: number): void {
    this.currentPage.next(page);
  }
}
