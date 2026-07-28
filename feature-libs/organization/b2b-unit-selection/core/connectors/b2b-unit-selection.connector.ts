/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { Observable } from 'rxjs';
import { B2bUnitSelectionAdapter } from './b2b-unit-selection.adapter';

@Injectable()
export class B2bUnitSelectionConnector {
  constructor(protected adapter: B2bUnitSelectionAdapter) {}

  loadDefaultOrgUnitName(userId: string): Observable<string | undefined> {
    return this.adapter.loadDefaultOrgUnitName(userId);
  }

  loadOrgUnits(userId: string): Observable<B2BUnit[]> {
    return this.adapter.loadOrgUnits(userId);
  }

  setDefaultOrgUnit(userId: string, unitName: string): Observable<void> {
    return this.adapter.setDefaultOrgUnit(userId, unitName);
  }
}
