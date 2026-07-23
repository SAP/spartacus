/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

/**
 * Coordinates the timing between B2B unit selection and the post-login redirect.
 *
 * Flow:
 *   1. MetaReducer calls blockRedirect() synchronously on LOGIN dispatch.
 *   2. AuthRedirectService.redirect() detects the blocked state and suspends.
 *   3. The effect loads org units and opens the dialog.
 *   4. After the user confirms a unit, allowRedirect() is called and
 *      the suspended redirect executes.
 */
@Injectable({ providedIn: 'root' })
export class B2bRedirectCoordinator {
  private allowed$ = new BehaviorSubject<boolean>(true);

  blockRedirect(): void {
    this.allowed$.next(false);
  }

  allowRedirect(): void {
    this.allowed$.next(true);
  }

  isBlocked(): boolean {
    return !this.allowed$.getValue();
  }

  /** Emits once when the gate opens, then completes. */
  whenAllowed$(): Observable<boolean> {
    return this.allowed$.pipe(
      filter((v) => v),
      take(1)
    );
  }
}
