/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

/**
 * Default OCC endpoint configuration for the B2B unit-selection feature.
 *
 * Placed in the **root** entry-point (eagerly loaded) so that
 * `OccEndpointsService` — a root singleton whose config is built once at
 * app startup — can resolve these endpoint keys before the lazy feature
 * module is bootstrapped.
 */
export const defaultOccB2bUnitSelectionConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        orgUser: 'orgUsers/${userId}',
        orgUserUnits: 'orgUsers/${userId}/orgUnits',
        orgUserDefaultUnit: 'orgUsers/${userId}/defaultOrgUnit',
      },
    },
  },
};
