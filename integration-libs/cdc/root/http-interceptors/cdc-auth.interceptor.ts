/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthInterceptor } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class CdcAuthInterceptor extends AuthInterceptor {
  protected errorIsInvalidToken(errResponse: HttpErrorResponse): boolean {
    const authHeader = errResponse.headers.get('www-authenticate');
    const parts = authHeader
      ? authHeader.split(',').map((part) => part.trim())
      : [];
    const errorPart = parts.find((part) => part.startsWith('Bearer error='));
    const errorDetails = errorPart
      ? errorPart.split('=')[1].replace(/"/g, '')
      : '';
    return errorDetails === 'invalid_token' ?? false;
  }
  protected isExpiredToken(resp: HttpErrorResponse): boolean {
    return resp.error?.errors?.[0]?.type === 'AccessDeniedError';
  }
}
