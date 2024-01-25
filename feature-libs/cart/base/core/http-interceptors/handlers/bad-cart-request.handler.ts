/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ErrorModel,
  GlobalMessageType,
  HttpErrorHandler,
  HttpResponseStatus,
  Priority,
} from '@spartacus/core';
import { isCartError, isCartNotFoundError } from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class BadCartRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  getPriority(): Priority {
    return Priority.NORMAL;
  }

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return (
      super.hasMatch(errorResponse) &&
      this.getErrors(errorResponse).some(isCartError)
    );
  }

  handleError(request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.handleCartNotFoundError(request, response);
    this.handleOtherCartErrors(request, response);
  }

  protected handleCartNotFoundError(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    this.getErrors(response)
      .filter((e) => isCartNotFoundError(e))
      .forEach(() => {
        this.globalMessageService.add(
          { key: 'httpHandlers.cartNotFound' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  protected handleOtherCartErrors(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    this.getErrors(response)
      .filter((e) => e.reason !== 'notFound' || e.subjectType !== 'cart')
      .forEach((error) => {
        this.globalMessageService.add(
          error.message
            ? error.message
            : { key: 'httpHandlers.otherCartErrors' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors || []).filter(
      (error: any) => error.type !== 'JaloObjectNoLongerValidError'
    );
  }
}
