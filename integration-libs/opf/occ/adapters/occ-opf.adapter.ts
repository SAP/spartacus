/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  backOff,
  ConverterService,
  isJaloError,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import {
  OpfAdapter,
  OpfEndpointsService,
  OPF_ACTIVE_CONFIGURATION_NORMALIZER,
} from '@spartacus/opf/core';
import { ActiveConfiguration } from '@spartacus/opf/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccOpfAdapter implements OpfAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService,
    protected opfEndpointsService: OpfEndpointsService
  ) {}

  getActiveConfigurations(): Observable<ActiveConfiguration[]> {
    this.opfEndpointsService.buildUrl('getActiveConfigurations');

    let headers = new HttpHeaders({
      'X-SAP-OPF-Public-Key': '123',
      'Accept-Language': 'en-US',
    });

    return this.http
      .get<ActiveConfiguration[]>(
        this.opfEndpointsService.buildUrl('getActiveConfigurations'),
        { headers }
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({
          shouldRetry: isJaloError,
        }),
        this.converter.pipeable(OPF_ACTIVE_CONFIGURATION_NORMALIZER)
      );
  }

  protected getActiveConfigurationsEndpoint(): string {
    return this.occEndpoints.buildUrl('getActiveConfigurations');
  }
}
