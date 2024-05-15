/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ConverterService,
  LoggerService,
  normalizeHttpError,
  OccEndpointsService,
  PaginationModel,
} from '@spartacus/core';
import {
  QUOTE_ACTION_SERIALIZER,
  QUOTE_COMMENT_SERIALIZER,
  QUOTE_DISCOUNT_SERIALIZER,
  QUOTE_LIST_NORMALIZER,
  QUOTE_METADATA_SERIALIZER,
  QUOTE_NORMALIZER,
  QUOTE_STARTER_SERIALIZER,
  QuoteAdapter,
} from '@spartacus/quote/core';
import {
  OccQuote,
  Quote,
  QuoteActionType,
  QuoteComment,
  QuoteDiscount,
  QuoteList,
  QuoteMetadata,
  QuoteStarter,
} from '@spartacus/quote/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccQuoteAdapter implements QuoteAdapter {
  protected httpClient = inject(HttpClient);
  protected occEndpointsService = inject(OccEndpointsService);
  protected converterService = inject(ConverterService);
  protected loggerService = inject(LoggerService);

  getQuotes(
    userId: string,
    pagination: PaginationModel
  ): Observable<QuoteList> {
    const params: { [key: string]: string } = {};
    if (pagination.pageSize) {
      params['pageSize'] = pagination.pageSize.toString();
    }
    if (pagination.currentPage) {
      params['currentPage'] = pagination.currentPage.toString();
    }
    if (pagination.sort) {
      params['sort'] = pagination.sort.toString();
    }

    return this.withErrorHandling(
      this.httpClient.get<QuoteList>(this.getQuotesEndpoint(userId, params))
    ).pipe(this.converterService.pipeable(QUOTE_LIST_NORMALIZER));
  }

  protected getQuotesEndpoint(
    userId: string,
    params?: PaginationModel
  ): string {
    return this.occEndpointsService.buildUrl('getQuotes', {
      urlParams: { userId },
      queryParams: params,
    });
  }

  createQuote(userId: string, quoteStarter: QuoteStarter): Observable<Quote> {
    quoteStarter = this.converterService.convert(
      quoteStarter,
      QUOTE_STARTER_SERIALIZER
    );

    return this.withErrorHandling(
      this.httpClient.post<OccQuote>(
        this.getCreateQuoteEndpoint(userId),
        quoteStarter
      )
    ).pipe(this.converterService.pipeable(QUOTE_NORMALIZER));
  }

  protected getCreateQuoteEndpoint(userId: string): string {
    return this.occEndpointsService.buildUrl('createQuote', {
      urlParams: { userId },
    });
  }

  getQuote(userId: string, quoteCode: string): Observable<Quote> {
    return this.withErrorHandling(
      this.httpClient.get<OccQuote>(this.getQuoteEndpoint(userId, quoteCode))
    ).pipe(this.converterService.pipeable(QUOTE_NORMALIZER));
  }

  protected getQuoteEndpoint(userId: string, quoteCode: string): string {
    return this.occEndpointsService.buildUrl('getQuote', {
      urlParams: { userId, quoteCode },
    });
  }

  editQuote(
    userId: string,
    quoteCode: string,
    quoteMetadata: QuoteMetadata
  ): Observable<unknown> {
    quoteMetadata = this.converterService.convert(
      quoteMetadata,
      QUOTE_METADATA_SERIALIZER
    );

    return this.withErrorHandling(
      this.httpClient.patch<Quote>(
        this.getEditQuoteEndpoint(userId, quoteCode),
        quoteMetadata
      )
    );
  }

  protected getEditQuoteEndpoint(userId: string, quoteCode: string): string {
    return this.occEndpointsService.buildUrl('editQuote', {
      urlParams: { userId, quoteCode },
    });
  }

  performQuoteAction(
    userId: string,
    quoteCode: string,
    quoteAction: QuoteActionType
  ): Observable<unknown> {
    quoteAction = this.converterService.convert(
      quoteAction,
      QUOTE_ACTION_SERIALIZER
    );

    return this.withErrorHandling(
      this.httpClient.post<unknown>(
        this.getPerformQuoteActionEndpoint(userId, quoteCode),
        {
          action: quoteAction,
        }
      )
    );
  }

  protected getPerformQuoteActionEndpoint(
    userId: string,
    quoteCode: string
  ): string {
    return this.occEndpointsService.buildUrl('performQuoteAction', {
      urlParams: { userId, quoteCode },
    });
  }

  addComment(
    userId: string,
    quoteCode: string,
    quoteComment: QuoteComment
  ): Observable<unknown> {
    quoteComment = this.converterService.convert(
      quoteComment,
      QUOTE_COMMENT_SERIALIZER
    );

    return this.withErrorHandling(
      this.httpClient.post<unknown>(
        this.getAddCommentEndpoint(userId, quoteCode),
        quoteComment
      )
    );
  }

  protected getAddCommentEndpoint(userId: string, quoteCode: string): string {
    return this.occEndpointsService.buildUrl('addComment', {
      urlParams: { userId, quoteCode },
    });
  }

  addDiscount(
    userId: string,
    quoteCode: string,
    quoteDiscount: QuoteDiscount
  ): Observable<unknown> {
    quoteDiscount = this.converterService.convert(
      quoteDiscount,
      QUOTE_DISCOUNT_SERIALIZER
    );

    return this.withErrorHandling(
      this.httpClient.post<unknown>(
        this.getAddDiscountEndpoint(userId, quoteCode),
        quoteDiscount
      )
    );
  }

  protected getAddDiscountEndpoint(userId: string, quoteCode: string): string {
    return this.occEndpointsService.buildUrl('addDiscount', {
      urlParams: { userId, quoteCode },
    });
  }

  addQuoteEntryComment(
    userId: string,
    quoteCode: string,
    entryNumber: string,
    comment: QuoteComment
  ): Observable<unknown> {
    comment = this.converterService.convert(comment, QUOTE_COMMENT_SERIALIZER);

    return this.withErrorHandling(
      this.httpClient.post<unknown>(
        this.getAddQuoteEntryCommentEndpoint(userId, quoteCode, entryNumber),
        comment
      )
    );
  }

  protected getAddQuoteEntryCommentEndpoint(
    userId: string,
    quoteCode: string,
    entryNumber: string
  ): string {
    return this.occEndpointsService.buildUrl('addQuoteEntryComment', {
      urlParams: { userId, quoteCode, entryNumber },
    });
  }

  downloadAttachment(
    userId: string,
    quoteCode: string,
    attachmentId: string
  ): Observable<Blob> {
    return this.withErrorHandling(
      this.httpClient.get<Blob>(
        this.getDownloadAttachmentEndpoint(userId, quoteCode, attachmentId),
        { responseType: 'blob' as 'json' }
      )
    );
  }

  protected getDownloadAttachmentEndpoint(
    userId: string,
    quoteCode: string,
    attachmentId: string
  ): string {
    return this.occEndpointsService.buildUrl('downloadAttachment', {
      urlParams: { userId, quoteCode, attachmentId },
    });
  }

  protected withErrorHandling<T>(
    quoteObservable: Observable<T>
  ): Observable<T> {
    return quoteObservable.pipe(
      catchError((error) =>
        throwError(normalizeHttpError(error, this.loggerService))
      )
    );
  }
}
