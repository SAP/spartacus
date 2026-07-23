/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  B2BUnit,
  LoggerService,
  OccEndpointsService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { B2bUnitSelectionAdapter } from '../../core/connectors/b2b-unit-selection.adapter';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// Side-effect import: registers the OccEndpoints module augmentation.
import '../model/occ-b2b-unit-selection-endpoints.model';

@Injectable()
export class OccB2bUnitSelectionAdapter implements B2bUnitSelectionAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService
  ) {}

  loadDefaultOrgUnitUid(userId: string): Observable<string | undefined> {
    return this.http
      .get<{ orgUnit?: { name?: string } }>(
        this.occEndpoints.buildUrl('orgUser', { urlParams: { userId } })
      )
      .pipe(
        map((response) => response?.orgUnit?.name),
        catchError((error: HttpErrorResponse) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }

  loadOrgUnits(userId: string): Observable<B2BUnit[]> {
    return this.http
      .get<{ orgUnits: B2BUnit[] }>(
        this.occEndpoints.buildUrl('orgUserUnits', {
          urlParams: { userId },
        })
      )
      .pipe(
        map((response) => response?.orgUnits ?? []),
        catchError((error: HttpErrorResponse) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }

  setDefaultOrgUnit(userId: string, unitUid: string): Observable<void> {
    return this.http
      .put<void>(
        this.occEndpoints.buildUrl('orgUserDefaultUnit', {
          urlParams: { userId },
        }),
        { uid: unitUid }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }
}
