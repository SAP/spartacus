/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
    punchoutSession: undefined,
    cancelRequisition: undefined,
    punchoutInitialRequisition: undefined,
    closePunchoutSession: undefined,
  });

  protected punchoutState = new BehaviorSubject<PunchoutState>(
    this.INITIAL_STATE
  );

  getPunchoutSessionId(): string | undefined {
    return this.punchoutState?.value?.punchoutSessionId;
  }

  getPunchoutState(): Observable<PunchoutState> {
    return this.punchoutState.asObservable();
  }

  setPunchoutState(payload: Partial<PunchoutState>): void {
    this.punchoutState.next({
      ...payload,
    });
  }

  updatePunchoutState(payload: Partial<PunchoutState>): void {
    this.punchoutState.next({
      ...this.punchoutState.value,
      ...payload,
    });
  }

  clearPunchoutState(): void {
    this.punchoutState.next(this.INITIAL_STATE);
  }
}
