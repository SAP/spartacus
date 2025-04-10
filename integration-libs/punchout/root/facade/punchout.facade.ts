/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PUNCHOUT_FEATURE } from '../feature-name';
import {
  PunchoutRequisition,
  PunchoutSession,
  PunchoutSessionInput,
} from '../model/punchout.model';

export function punchoutFacadeFactory() {
  return facadeFactory({
    facade: PunchoutFacade,
    feature: PUNCHOUT_FEATURE,
    methods: [
      'getPunchoutSession',
      'getPunchoutSessionRequisition',
      'logoutPunchoutUser',
      'closePunchoutSession',
    ],
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: punchoutFacadeFactory,
})
export abstract class PunchoutFacade {
  /**
   * Abstract method used to get Punchout Session
   * @param sessionId is the sesssion Id given by ARIBA via url param
   */
  abstract getPunchoutSession(
    punchoutSessionInput: PunchoutSessionInput
  ): Observable<PunchoutSession>;

  /**
   * Abstract method used to get Punchout Session Requisition data
   */
  abstract getPunchoutSessionRequisition(): Observable<
    PunchoutRequisition | undefined
  >;

  /**
   * Abstract method used to logout punchout user
   */
  abstract logoutPunchoutUser(): Observable<boolean>;

  /**
   * Abstract method used to close punchout session
   */
  abstract closePunchoutSession(): Observable<boolean>;
}
