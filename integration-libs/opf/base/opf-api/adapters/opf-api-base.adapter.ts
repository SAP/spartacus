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
  tryNormalizeHttpError,
} from '@spartacus/core';
import {
  OPF_ACTIVE_CONFIGURATIONS_NORMALIZER,
  OpfBaseAdapter,
  OpfEndpointsService,
} from '@spartacus/opf/base/core';
import {
  OPF_CC_PUBLIC_KEY_HEADER,
  OpfActiveConfigurationsQuery,
  OpfActiveConfigurationsResponse,
  OpfConfig,
  OpfMetadataStatePersistanceService,
} from '@spartacus/opf/base/root';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OpfApiBaseAdapter implements OpfBaseAdapter {
  protected http = inject(HttpClient);
  protected converter = inject(ConverterService);
  protected opfEndpointsService = inject(OpfEndpointsService);
  protected config = inject(OpfConfig);
  protected opfMetadataStatePersistanceService = inject(
    OpfMetadataStatePersistanceService
  );
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

  getActiveConfigurations(
    query?: OpfActiveConfigurationsQuery
  ): Observable<OpfActiveConfigurationsResponse> {
    const headers = new HttpHeaders(this.header).set(
      OPF_CC_PUBLIC_KEY_HEADER,
      this.config.opf?.commerceCloudPublicKey || ''
    );

    return this.http
      .get<OpfActiveConfigurationsResponse>(
        this.getActiveConfigurationsEndpoint(query),
        {
          headers,
        }
      )
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        this.converter.pipeable(OPF_ACTIVE_CONFIGURATIONS_NORMALIZER)
      );
  }

  protected getActiveConfigurationsEndpoint(
    query?: OpfActiveConfigurationsQuery
  ): string {
    return this.opfEndpointsService.buildUrl('getActiveConfigurations', {
      queryParams: query,
    });
  }
}
