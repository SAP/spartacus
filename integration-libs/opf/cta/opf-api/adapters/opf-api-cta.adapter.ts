/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ConverterService,
  LoggerService,
  backOff,
  isServerError,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { OpfEndpointsService } from '@spartacus/opf/base/core';
import {
  OPF_CC_PUBLIC_KEY_HEADER,
  OpfConfig,
  OpfMetadataStatePersistanceService,
} from '@spartacus/opf/base/root';
import {
  OPF_CTA_SCRIPTS_NORMALIZER,
  OpfCtaAdapter,
} from '@spartacus/opf/cta/core';
import {
  OpfCtaScriptsRequest,
  OpfCtaScriptsResponse,
} from '@spartacus/opf/cta/root';
import { OpfPaymentSubmitResponse } from '@spartacus/opf/payment/root';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OpfApiCtaAdapter implements OpfCtaAdapter {
  protected http = inject(HttpClient);
  protected converter = inject(ConverterService);
  protected opfEndpointsService = inject(OpfEndpointsService);
  protected opfMetadataStatePersistanceService = inject(
    OpfMetadataStatePersistanceService
  );
  protected config = inject(OpfConfig);

  protected logger = inject(LoggerService);

  protected headerWithNoLanguage: { [name: string]: string } = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  };
  protected header: { [name: string]: string } = {
    ...this.headerWithNoLanguage,
    'Accept-Language':
      this.opfMetadataStatePersistanceService.getActiveLanguage(),
  };

  protected headerWithContentLanguage: { [name: string]: string } = {
    ...this.headerWithNoLanguage,
    'Content-Language':
      this.opfMetadataStatePersistanceService.getActiveLanguage(),
  };

  getCtaScripts(
    opfCtaScriptsRequest: OpfCtaScriptsRequest
  ): Observable<OpfCtaScriptsResponse> {
    const headers = new HttpHeaders(this.header).set(
      OPF_CC_PUBLIC_KEY_HEADER,
      this.config.opf?.commerceCloudPublicKey || ''
    );

    const url = this.getCtaScriptsEndpoint();

    return this.http
      .post<OpfPaymentSubmitResponse>(url, opfCtaScriptsRequest, { headers })
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isServerError,
          maxTries: 2,
        }),
        this.converter.pipeable(OPF_CTA_SCRIPTS_NORMALIZER)
      );
  }

  protected getCtaScriptsEndpoint(): string {
    return this.opfEndpointsService.buildUrl('getCtaScripts');
  }
}
