/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ErrorModel,
  GlobalMessageService,
  HttpErrorHandler,
  HttpResponseStatus,
  Priority,
  RoutingService,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class QuoteNotFoundHandler extends HttpErrorHandler {
  protected routingService = inject(RoutingService);
  responseStatus = HttpResponseStatus.NOT_FOUND;

  constructor(protected globalMessageService: GlobalMessageService) {
    super(globalMessageService);
  }

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return (
      super.hasMatch(errorResponse) &&
      this.getQuoteNotFoundErrors(errorResponse).length > 0
    );
  }

  handleError(_request: HttpRequest<any>): void {
    this.navigateToQuoteList();
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }

  /**
   * This situation can happen e.g. if one ends an ASM emulation while viewing a quote and afterwards emulates a session
   * for a different user.
   *
   * @param response - HTTP response
   * @returns Array of error models or empty array if no issues occurred
   */
  protected getQuoteNotFoundErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors ?? []).filter(
      (error: ErrorModel) =>
        error.type === 'NotFoundError' && error.message === 'Quote not found'
    );
  }

  protected navigateToQuoteList(): void {
    this.routingService.go({ cxRoute: 'quotes' });
  }
}
