/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorHandler,
  ErrorModel,
  HttpResponseStatus,
  Priority,
} from '@spartacus/core';
import { QuoteCartService } from '@spartacus/quote/root';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuoteBadRequestHandler extends HttpErrorHandler {
  protected quoteCartService = inject(QuoteCartService);
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  constructor(protected globalMessageService: GlobalMessageService) {
    super(globalMessageService);
  }

  handleError(_request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.getQuoteThresholdErrors(response).forEach(
      ({ message }: ErrorModel) => {
        this.handleQuoteThresholdErrors(message as string);
      }
    );

    this.getIllegalArgumentErrors(response).forEach(
      ({ message }: ErrorModel) => {
        this.handleIllegalArgumentIssues(message as string);
      }
    );

    if (this.getCartValidationErrors(response).length > 0) {
      this.handleCartValidationIssues();
    }

    if (this.getDomainErrors(response).length > 0) {
      this.handleDomainErrors(this.quoteCartService);
    }
  }

  protected getQuoteThresholdErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors ?? []).filter(
      (error: ErrorModel) => error.type === 'QuoteUnderThresholdError'
    );
  }

  protected getCartValidationErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors ?? []).filter(
      (error: ErrorModel) => error.type === 'CartValidationError'
    );
  }

  protected getDomainErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors ?? []).filter(
      (error: ErrorModel) => error.type === 'DomainError'
    );
  }

  protected getIllegalArgumentErrors(
    response: HttpErrorResponse
  ): ErrorModel[] {
    return (response.error?.errors ?? []).filter(
      (error: ErrorModel) => error.type === 'IllegalArgumentError'
    );
  }

  protected handleQuoteThresholdErrors(message: string) {
    const unmetThresholdMask = /does not meet the threshold\./;
    const result = message.match(unmetThresholdMask);

    if (result) {
      this.globalMessageService.add(
        {
          key: 'quote.httpHandlers.threshold.underThresholdError',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  protected handleCartValidationIssues() {
    this.globalMessageService.add(
      {
        key: 'quote.httpHandlers.cartValidationIssue',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  protected handleDomainErrors(quoteCartService: QuoteCartService) {
    quoteCartService
      .isQuoteCartActive()
      .pipe(take(1))
      .subscribe((isActive) => {
        if (isActive) {
          this.globalMessageService.add(
            {
              key: 'quote.httpHandlers.quoteCartIssue',
            },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        }
      });
  }

  protected handleIllegalArgumentIssues(message: string) {
    const discountMask = /Discount type is absolute/;
    const discountRelated = message.match(discountMask);
    const expirationMask = /Invalid quote expiration time/;
    const expirationRelated = message.match(expirationMask);

    if (discountRelated) {
      this.globalMessageService.add(
        {
          key: 'quote.httpHandlers.absoluteDiscountIssue',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }

    if (expirationRelated) {
      this.globalMessageService.add(
        {
          key: 'quote.httpHandlers.expirationDateIssue',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }
}
