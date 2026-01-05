/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PunchoutRequisition, PunchoutSession } from '@spartacus/punchout/root';
import { Observable } from 'rxjs';

export abstract class PunchoutAdapter {
  /**
   * Abstract method used to get Punchout Session
   * @param sessionId is the sesssion Id given by ARIBA via url
   */
  abstract getPunchoutSession(sessionId: string): Observable<PunchoutSession>;

  /**
   * Abstract method used to get Punchout Session Requisition data
   * @param sessionId is the sesssion Id given by ARIBA via url
   */
  abstract getPunchoutSessionRequisition(
    sessionId: string,
    discardCartEntries?: boolean
  ): Observable<PunchoutRequisition>;
}
