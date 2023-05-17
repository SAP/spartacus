/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { OtpAdapter } from '@spartacus/opf/checkout/core';

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
