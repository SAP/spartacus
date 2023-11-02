/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  GlobalMessageService,
  HttpErrorHandler,
  ErrorModel,
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

  handleError(_request: HttpRequest<any>, response: HttpErrorResponse): void {
    if (this.getQuoteNotFoundErrors(response).length > 0) {
      this.navigateToQuoteList();
    }
  }

  /**
   * This situation can happen e.g. if one ends an ASM emulation while viewing a quote and afterwards emulates a session
   * for a different user
   * @param response HTTP response
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

  getPriority(): Priority {
    return Priority.NORMAL;
  }
}
