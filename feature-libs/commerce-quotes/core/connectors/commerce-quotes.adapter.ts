import { PaginationModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  QuoteList,
  QuoteStarter,
  Quote,
  QuoteMetadata,
  QuoteAction,
  Comment,
  QuoteDiscount,
} from './../model/commerce-quotes.model';

export abstract class CommerceQuotesAdapter {
  /**
   * Abstract method used to list of quotes for user
   *
   * @param userId
   * @param pagination
   */
  abstract getQuotes(
    userId: string,
    pagination: PaginationModel
  ): Observable<QuoteList>;

  /**
   * Abstract method used to request / create a quote
   *
   * @param userId
   */
  abstract createQuote(
    userId: string,
    quoteStarter: QuoteStarter
  ): Observable<Quote>;

  /**
   * Abstract method used to get quote details
   *
   * @param userId
   * @param quoteCode
   */
  abstract getQuote(userId: string, quoteCode: string): Observable<Quote>;

  /**
   * Abstract method used to edit a quote
   *
   * @param userId
   * @param quoteCode
   */
  abstract editQuote(
    userId: string,
    quoteCode: string,
    quoteMetadata: QuoteMetadata
  ): Observable<unknown>;

  /**
   * Abstract method used to perform actions on a quote`
   *
   * @param userId
   * @param quoteCode
   */
  abstract performActionQuote(
    userId: string,
    quoteCode: string,
    quoteAction: QuoteAction
  ): Observable<unknown>;

  /**
   * Abstract method used to add comment to a quote`
   *
   * @param userId
   * @param quoteCode
   */
  abstract addComment(
    userId: string,
    quoteCode: string,
    quoteComment: Comment
  ): Observable<unknown>;

  /**
   * Abstract method used to add discount to a quote`
   *
   * @param userId
   * @param quoteCode
   */
  abstract addDiscount(
    userId: string,
    quoteCode: string,
    discount: QuoteDiscount
  ): Observable<unknown>;

  /**
   * Abstract method used to add comment to quotes cart entry`
   *
   * @param userId
   * @param quoteCode
   * @param entryNumber
   */
  abstract addCartEntryComment(
    userId: string,
    quoteCode: string,
    entryNumber: string,
    comment: Comment
  ): Observable<unknown>;
}
