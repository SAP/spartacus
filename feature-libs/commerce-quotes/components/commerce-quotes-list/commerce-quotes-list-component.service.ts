import { Injectable } from '@angular/core';
import {
  CommerceQuotesFacade,
  QuoteList,
} from '@spartacus/commerce-quotes/root';
import { QueryState, SortModel, TranslationService } from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
        // currentPage$: this.currentPage.asObservable(),
        // sort$: this.sort.asObservable(),
        currentPage$: this.currentPage,
        sort$: this.sort,
      })
      .pipe(
        tap((_quotesState) => {
          console.log('component service quotesState$ emit');
        }),
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
    protected commerceQuotesFacade: CommerceQuotesFacade,
    protected translationService: TranslationService
  ) {
    this.sort.subscribe((sort) => console.log({ sort }));
    this.currentPage.subscribe((currentPage) => console.log({ currentPage }));
    window['spikeInComponentService'] = {
      sort: this.sort,
      currentPage: this.currentPage,
    };
  }

  setSort(sort: string): void {
    console.log('setSort()', sort);
    this.sort.next(sort);
  }

  setCurrentPage(page: number): void {
    console.log('setCurrentPage()', page);
    this.currentPage.next(page);
  }
}
