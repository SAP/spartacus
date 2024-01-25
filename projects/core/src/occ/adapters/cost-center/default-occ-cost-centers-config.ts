/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '../../config/occ-config';

export const defaultOccCostCentersConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        getActiveCostCenters:
          '/costcenters?fields=DEFAULT,unit(BASIC,addresses(DEFAULT))',
      },
    },
  },
};
