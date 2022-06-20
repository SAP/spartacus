import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { COMMERCE_QUOTES_FEATURE } from '../feature-name';
import { Injectable } from '@angular/core';
import {
  Quote,
  QuoteList,
  QuoteMetadata,
  Comment,
} from '../model/commerce-quotes.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CommerceQuotesFacade,
      feature: COMMERCE_QUOTES_FEATURE,
      methods: [
        'getQuotesState',
        'createQuote',
        'editQuote',
        'addQuoteComment',
      ],
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

  /**
   * Returns the query list state.
   */
  abstract createQuote(): Observable<Quote>;

  /**
   * Edit quote name, description or expiry date.
   */
  abstract editQuote(
    quoteCode: string,
    quoteMetadata: QuoteMetadata
  ): Observable<unknown>;

  /**
   * Add comment to a quote.
   */
  abstract addQuoteComment(
    quoteCode: string,
    quoteComment: Comment
  ): Observable<unknown>;
}
