/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

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
