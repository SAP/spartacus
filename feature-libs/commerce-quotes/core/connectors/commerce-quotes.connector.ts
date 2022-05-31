import { Injectable } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  Quote,
  QuoteAction,
  QuoteDiscount,
  QuoteList,
  QuoteMetadata,
  QuoteStarter,
  Comment,
} from '@spartacus/commerce-quotes/root';
import { CommerceQuotesAdapter } from './commerce-quotes.adapter';

@Injectable()
export class CommerceQuotesConnector {
  constructor(protected adapter: CommerceQuotesAdapter) {}

  public getQuotes(
    userId: string,
    pagination: PaginationModel
  ): Observable<QuoteList> {
    return this.adapter.getQuotes(userId, pagination);
  }

  public createQuote(
    userId: string,
    quoteStarter: QuoteStarter
  ): Observable<Quote> {
    return this.adapter.createQuote(userId, quoteStarter);
  }

  public getQuote(userId: string, quoteCode: string): Observable<Quote> {
    return this.adapter.getQuote(userId, quoteCode);
  }

  public editQuote(
    userId: string,
    quoteCode: string,
    quoteMetadata: QuoteMetadata
  ): Observable<unknown> {
    return this.adapter.editQuote(userId, quoteCode, quoteMetadata);
  }

  public performActionQuote(
    userId: string,
    quoteCode: string,
    quoteAction: QuoteAction
  ): Observable<unknown> {
    return this.adapter.performActionQuote(userId, quoteCode, quoteAction);
  }

  public addComment(
    userId: string,
    quoteCode: string,
    quoteComment: Comment
  ): Observable<unknown> {
    return this.adapter.addComment(userId, quoteCode, quoteComment);
  }

  public addDiscount(
    userId: string,
    quoteCode: string,
    discount: QuoteDiscount
  ): Observable<unknown> {
    return this.adapter.addDiscount(userId, quoteCode, discount);
  }

  public addCartEntryComment(
    userId: string,
    quoteCode: string,
    entryNumber: string,
    comment: Comment
  ): Observable<unknown> {
    return this.adapter.addCartEntryComment(
      userId,
      quoteCode,
      entryNumber,
      comment
    );
  }
}
