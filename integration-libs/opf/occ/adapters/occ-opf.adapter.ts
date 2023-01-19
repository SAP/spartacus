/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
    protected converter: ConverterService,
    protected opfEndpointsService: OpfEndpointsService
  ) {}

  getActiveConfigurations(): Observable<ActiveConfiguration[]> {
    let headers = new HttpHeaders({
      // TODO: (OPF) to be changed once backend has stable configuration
      'sap-commerce-cloud-public-key': '123',
    });

    return this.http
      .get<ActiveConfiguration[]>(this.getActiveConfigurationsEndpoint(), {
        headers,
      })
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({
          shouldRetry: isJaloError,
        }),
        this.converter.pipeable(OPF_ACTIVE_CONFIGURATION_NORMALIZER)
      );
  }

  protected getActiveConfigurationsEndpoint(): string {
    return this.opfEndpointsService.buildUrl('getActiveConfigurations');
  }
}
