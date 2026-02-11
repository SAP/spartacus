/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
      'initPunchoutSession',
      'getPunchoutSessionRequisition',
      'logoutPunchoutUser',
      'closePunchoutSession',
      'requestPunchoutSession',
      'endPunchoutSession',
      'submitRequisition',
    ],
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: punchoutFacadeFactory,
})
export abstract class PunchoutFacade {
  /**
   * Abstract method used to get Punchout Session, worflow:
   * occ api request, logout previous user, login punchout user, load cart
   * @param sessionId is the sesssion Id given by ARIBA via url param
   */
  abstract initPunchoutSession(
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
   *  Abstract method used to end punchout session
   *  Flow: logout, clear punchout state and redirect to login page
   */
  abstract endPunchoutSession(): Observable<unknown>;

  /**
   * Abstract method used to close punchout session
   */
  abstract closePunchoutSession(): Observable<boolean>;

  /**
   * Abstract method used to get Punchout Session response from cx-server
   * @param sessionId is the sesssion Id given by ARIBA via url param
   */
  abstract requestPunchoutSession(
    punchoutSessionId: string
  ): Observable<PunchoutSession>;

  abstract submitRequisition(cancelRequisition: boolean): void;
}
