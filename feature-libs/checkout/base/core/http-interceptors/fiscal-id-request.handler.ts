/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  getFiscalIdErrorKey,
  getFiscalIdErrorParams,
} from '@spartacus/checkout/base/root';
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
    request: HttpRequest<unknown>,
    response: HttpErrorResponse
  ): void {
    const errors = this.getErrors(response);
    const errorKeys = new Set(
      errors.map((error) => getFiscalIdErrorKey(error.errorCode))
    );
    if (!errorKeys.size) {
      errorKeys.add(getFiscalIdErrorKey());
    }
    const body = request.body;
    const country =
      body &&
      typeof body === 'object' &&
      'sapCountry' in body &&
      typeof body.sapCountry === 'string'
        ? body.sapCountry
        : undefined;
    errorKeys.forEach((key) => {
      const params = getFiscalIdErrorParams(key, country);
      this.globalMessageService.add(
        { key: 'fiscalId.errors.' + key, ...(params ? { params } : {}) },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return response.error?.errors ?? [];
  }
}
