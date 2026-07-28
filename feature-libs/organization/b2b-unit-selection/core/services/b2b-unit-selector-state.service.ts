/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Lightweight state service that shares B2B unit data between the unit-selection
 * dialog and the persistent B2B Unit selector in the header.
 *
 * Data is written by B2bUnitSelectionEffects after login; components subscribe
 * directly without issuing additional API calls.
 */
@Injectable({ providedIn: 'root' })
export class B2bUnitSelectorStateService {
  private _orgUnits$ = new BehaviorSubject<B2BUnit[]>([]);
  private _activeUnitName$ = new BehaviorSubject<string | null>(null);

  /** All org units assigned to the current user. */
  readonly orgUnits$: Observable<B2BUnit[]> = this._orgUnits$.asObservable();

  /** The name of the currently active (default) org unit. */
  readonly activeUnitName$: Observable<string | null> =
    this._activeUnitName$.asObservable();

  setOrgUnits(units: B2BUnit[]): void {
    this._orgUnits$.next(units);
  }

  setActiveUnit(name: string | null): void {
    this._activeUnitName$.next(name);
  }
}
