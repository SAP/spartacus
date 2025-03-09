/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PunchoutState } from '../model';

@Injectable({ providedIn: 'root' })
export class PunchoutStoreService {
  protected readonly INITIAL_STATE: PunchoutState = Object.freeze({
    punchoutSessionId: undefined,
    session: undefined,
  });

  punchoutState = new BehaviorSubject<PunchoutState>(this.INITIAL_STATE);

  getPunchoutState(): Observable<PunchoutState> {
    return this.punchoutState.asObservable();
  }

  setPunchoutState(payload: Partial<PunchoutState>): void {
    this.punchoutState.next({
      ...this.punchoutState.value,
      ...payload,
    });
  }

  clearPunchoutState(): void {
    this.punchoutState.next(this.INITIAL_STATE);
  }
}
