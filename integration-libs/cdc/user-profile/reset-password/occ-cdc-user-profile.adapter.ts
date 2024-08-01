/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
  normalizeHttpError,
} from '@spartacus/core';
import { OccUserProfileAdapter } from '@spartacus/user/profile/occ';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class OccCdcUserProfileAdapter extends OccUserProfileAdapter {
  protected cdcJsService = inject(CdcJsService);
  resetPassword(token: string, newPassword: string): Observable<unknown> {
    console.log('CDC resetPassword');
    const url = this.occEndpoints.buildUrl('userResetPassword');
    const apiKey = this.cdcJsService.getSiteAPIKey();
    const httpHeaderName = this.cdcJsService.getHttpHeaderName();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (apiKey) {
      headers = headers.set(httpHeaderName, apiKey);
    }
    console.log('headers', headers);

    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    return this.http.post(url, { token, newPassword }, { headers }).pipe(
      catchError((error) => {
        throw normalizeHttpError(error, this.logger);
      })
    );
  }
}
