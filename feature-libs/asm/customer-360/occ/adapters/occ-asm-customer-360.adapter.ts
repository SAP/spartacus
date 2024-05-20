/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ASM_CUSTOMER_360_NORMALIZER,
  AsmCustomer360Adapter,
} from '@spartacus/asm/customer-360/core';
import {
  AsmCustomer360Request,
  AsmCustomer360Response,
} from '@spartacus/asm/customer-360/root';
import {
  BaseSiteService,
  ConverterService,
  InterceptorUtil,
  LoggerService,
  OccEndpointsService,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccAsmCustomer360Adapter implements AsmCustomer360Adapter {
  protected logger = inject(LoggerService);

  private activeBaseSite: string;

  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService,
    protected baseSiteService: BaseSiteService
  ) {
    this.baseSiteService
      .getActive()
      .subscribe((value) => (this.activeBaseSite = value));
  }

  protected getHeaders(): HttpHeaders {
    return InterceptorUtil.createHeader(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      true,
      new HttpHeaders()
    );
  }

  getAsmCustomer360Data(
    request: AsmCustomer360Request
  ): Observable<AsmCustomer360Response> {
    const headers = InterceptorUtil.createHeader(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      true,
      new HttpHeaders()
    );

    const url = this.occEndpointsService.buildUrl(
      'asmCustomer360',
      {
        urlParams: {
          baseSiteId: this.activeBaseSite,
          userId: request.options.userId ?? '',
        },
      },
      {
        baseSite: false,
        prefix: false,
      }
    );

    const requestBody = {
      customer360Queries: request.queries,
    };

    return this.http
      .post<AsmCustomer360Response>(url, requestBody, { headers })
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        this.converterService.pipeable(ASM_CUSTOMER_360_NORMALIZER)
      );
  }
}
