/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  backOff,
  ConverterService,
  isJaloError,
  LoggerService,
  OccEndpointsService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import {
  PUNCHOUT_REQUISITION_NORMALIZER,
  PUNCHOUT_SESSION_NORMALIZER,
  PunchoutAdapter,
} from '@spartacus/punchout/core';
import { PunchoutRequisition, PunchoutSession } from '@spartacus/punchout/root';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class OccPunchoutAdapter implements PunchoutAdapter {
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);
  protected logger = inject(LoggerService);
  protected converter = inject(ConverterService);

  getPunchoutSession(sId: string): Observable<PunchoutSession> {
    return this.http
      .get<PunchoutSession>(
        this.occEndpoints.buildUrl('punchoutSession', {
          urlParams: { sId },
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({ shouldRetry: isJaloError }),
        this.converter.pipeable(PUNCHOUT_SESSION_NORMALIZER)
      );
  }

  getPunchoutRequisition(sId: string): Observable<PunchoutRequisition> {
    return this.http
      .get<PunchoutRequisition>(
        this.occEndpoints.buildUrl('punchoutRequisition', {
          urlParams: { sId },
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({ shouldRetry: isJaloError }),
        this.converter.pipeable(PUNCHOUT_REQUISITION_NORMALIZER)
      );
  }
}
