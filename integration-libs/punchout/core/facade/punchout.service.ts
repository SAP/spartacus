/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';

import {
  PunchoutFacade,
  PunchoutRequisition,
  PunchoutSession,
} from '@spartacus/punchout/root';
import { Observable } from 'rxjs';
import { PunchoutConnector } from '../connectors';

@Injectable()
export class PunchoutService implements PunchoutFacade {
  protected punchoutConnector = inject(PunchoutConnector);

  getPunchoutSession(sessionId: string): Observable<PunchoutSession> {
    return this.punchoutConnector.getPunchoutSession(sessionId);
  }

  getPunchoutSessionRequisition(
    sessionId: string
  ): Observable<PunchoutRequisition> {
    return this.punchoutConnector.getPunchoutSessionRequisition(sessionId);
  }
}
