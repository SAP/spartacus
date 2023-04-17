/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  InterceptorUtil,
  OCC_USER_ID_ANONYMOUS,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
} from '@spartacus/core';
import { OtpAdapter } from '@spartacus/opf/core';
import { Observable } from 'rxjs';

@Injectable()
export class OccOtpAdapter implements OtpAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  generateOtpKey(
    userId: string,
    cartId: string
  ): Observable<string | undefined> {
    let headers = new HttpHeaders();
    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }

    return this.http.post<string | undefined>(
      this.getGenerateOtpKeyEndpoint(userId, cartId),
      null
    );
  }

  protected getGenerateOtpKeyEndpoint(userId: string, cartId: string): string {
    return this.occEndpointsService.buildUrl('generateOtpKey', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }
}
