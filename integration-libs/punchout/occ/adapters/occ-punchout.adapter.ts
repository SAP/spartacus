/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ConverterService,
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

  getPunchoutSession(sessionId: string): Observable<PunchoutSession> {
    return this.http
      .get<PunchoutSession>(
        this.occEndpoints.buildUrl('punchoutSession', {
          urlParams: { sessionId },
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        this.converter.pipeable(PUNCHOUT_SESSION_NORMALIZER)
      );
  }

  getPunchoutSessionRequisition(
    sessionId: string
  ): Observable<PunchoutRequisition> {
    return this.http
      .get<PunchoutRequisition>(
        this.occEndpoints.buildUrl('punchoutRequisition', {
          urlParams: { sessionId },
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        this.converter.pipeable(PUNCHOUT_REQUISITION_NORMALIZER)
      );
  }
}
