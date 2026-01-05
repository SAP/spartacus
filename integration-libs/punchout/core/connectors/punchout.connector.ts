/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { PunchoutRequisition, PunchoutSession } from '@spartacus/punchout/root';
import { Observable } from 'rxjs';
import { PunchoutAdapter } from './punchout.adapter';

@Injectable()
export class PunchoutConnector {
  protected adapter = inject(PunchoutAdapter);

  public getPunchoutSession(sessionId: string): Observable<PunchoutSession> {
    return this.adapter.getPunchoutSession(sessionId);
  }

  public getPunchoutSessionRequisition(
    sessionId: string,
    discardCartEntries = false
  ): Observable<PunchoutRequisition> {
    return this.adapter.getPunchoutSessionRequisition(
      sessionId,
      discardCartEntries
    );
  }
}
