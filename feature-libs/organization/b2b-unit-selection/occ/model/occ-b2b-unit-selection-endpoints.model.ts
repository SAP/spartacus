/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface B2bUnitSelectionOccEndpoints {
  /**
   * Fetches current B2B user profile (includes the default orgUnit).
   * GET /{baseSiteId}/orgUsers/{userId}
   */
  orgUser?: string | OccEndpoint;

  /**
   * Fetches all org units assigned to the current B2B user.
   * GET /{baseSiteId}/orgUsers/{userId}/orgUnits
   */
  orgUserUnits?: string | OccEndpoint;

  /**
   * Sets the default org unit for the current B2B user.
   * PUT /{baseSiteId}/orgUsers/{userId}/defaultOrgUnit
   */
  orgUserDefaultUnit?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends B2bUnitSelectionOccEndpoints {}
}
