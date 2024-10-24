/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
  ActiveConfiguration,
  OPF_CC_PUBLIC_KEY_HEADER,
  OpfConfig,
} from '@spartacus/opf/base/root';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OpfApiBaseAdapter implements OpfBaseAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected converter: ConverterService,
    protected opfEndpointsService: OpfEndpointsService,
    protected config: OpfConfig
  ) {}

  protected headerWithNoLanguage: { [name: string]: string } = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  };
  protected header: { [name: string]: string } = {
    ...this.headerWithNoLanguage,
    'Accept-Language': 'en-us',
  };

  protected headerWithContentLanguage: { [name: string]: string } = {
    ...this.headerWithNoLanguage,
    'Content-Language': 'en-us',
  };

  getActiveConfigurations(): Observable<ActiveConfiguration[]> {
    const headers = new HttpHeaders(this.header).set(
      OPF_CC_PUBLIC_KEY_HEADER,
      this.config.opf?.commerceCloudPublicKey || ''
    );

    return this.http
      .get<ActiveConfiguration[]>(this.getActiveConfigurationsEndpoint(), {
        headers,
      })
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        this.converter.pipeable(OPF_ACTIVE_CONFIGURATIONS_NORMALIZER)
      );
  }

  protected getActiveConfigurationsEndpoint(): string {
    return this.opfEndpointsService.buildUrl('getActiveConfigurations');
  }
}
