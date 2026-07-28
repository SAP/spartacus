/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { B2BUnit } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class B2bUnitSelectionAdapter {
  /**
   * Fetches the current B2B user profile and returns the default org unit name.
   * Corresponds to GET /{baseSiteId}/orgUsers/{userId}
   */
  abstract loadDefaultOrgUnitName(
    userId: string
  ): Observable<string | undefined>;

  /**
   * Fetches all org units assigned to the current B2B user.
   */
  abstract loadOrgUnits(userId: string): Observable<B2BUnit[]>;

  /**
   * Sets the default org unit for the current B2B user.
   */
  abstract setDefaultOrgUnit(
    userId: string,
    unitName: string
  ): Observable<void>;
}
