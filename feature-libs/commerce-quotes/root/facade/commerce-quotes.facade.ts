import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { COMMERCE_QUOTES_FEATURE } from '../feature-name';
import { Injectable } from '@angular/core';
import { QuoteList } from '../model/commerce-quotes.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CommerceQuotesFacade,
      feature: COMMERCE_QUOTES_FEATURE,
      methods: ['getQuotesState'],
    }),
})
export abstract class CommerceQuotesFacade {
  /**
   * Set Qoery List current page
   * @param page number
   */
  abstract setCurrentPage(page: number): void;

  /**
   * Set Query List orting key
   * @param sort string
   */
  abstract setSort(sort: string): void;

  /**
   * Returns the query list state.
   */
  abstract getQuotesState(): Observable<QueryState<QuoteList | undefined>>;
}
