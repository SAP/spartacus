/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PunchoutRequisition, PunchoutSession } from '@spartacus/punchout/root';
import { Observable } from 'rxjs';

export abstract class PunchoutAdapter {
  /**
   * Abstract method used to get Punchout Session
   * @param sId is the sesssion Id given by ARIBA via url
   */
  abstract getPunchoutSession(sId: string): Observable<PunchoutSession>;

  /**
   * Abstract method used to get Punchout Requisition data
   * @param sId is the sesssion Id given by ARIBA via url
   */
  abstract getPunchoutRequisition(sId: string): Observable<PunchoutRequisition>;
}
