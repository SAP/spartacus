/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PUNCHOUT_FEATURE } from '../feature-name';
import { PunchoutRequisition, PunchoutSession } from '../model/punchout.model';

export function punchoutFacadeFactory() {
  return facadeFactory({
    facade: PunchoutFacade,
    feature: PUNCHOUT_FEATURE,
    methods: ['getPunchoutSession', 'getPunchoutRequisition'],
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: punchoutFacadeFactory,
})
export abstract class PunchoutFacade {
  /**
   * Abstract method used to get Punchout Session
   * @param sId is the sesssion Id given by ARIBA via url param
   */
  abstract getPunchoutSession(sId: string): Observable<PunchoutSession>;

  /**
   * Abstract method used to get Punchout Requisition data
   * @param sId is the sesssion Id given by ARIBA via url param
   */
  abstract getPunchoutRequisition(sId: string): Observable<PunchoutRequisition>;
}
