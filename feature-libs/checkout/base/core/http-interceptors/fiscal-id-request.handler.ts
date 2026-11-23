/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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

@Injectable()
export class FiscalIdRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  hasMatch(response: HttpErrorResponse): boolean {
    return (
      super.hasMatch(response) &&
      (Boolean(response.url?.split('?')[0].endsWith('/fiscalIds')) ||
        this.getErrors(response).some((error) =>
          error.errorCode?.startsWith('fiscal.id.')
        ))
    );
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }

  handleError(
    _request: HttpRequest<unknown>,
    response: HttpErrorResponse
  ): void {
    const errors = this.getErrors(response);
    const messages = new Set(
      errors.map((error) => error.message).filter(Boolean)
    );
    if (!messages.size) {
      this.globalMessageService.add(
        { key: 'httpHandlers.otherCartErrors' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      return;
    }
    messages.forEach((message) =>
      this.globalMessageService.add(
        message as string,
        GlobalMessageType.MSG_TYPE_ERROR
      )
    );
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return response.error?.errors ?? [];
  }
}
