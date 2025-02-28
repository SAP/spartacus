/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';
import { PunchoutOccEndpoints } from '../model/occ-punchout.model';

const punchoutOccEndpoints: PunchoutOccEndpoints = {
  punchoutSession: 'punchout/sessions/${sId}',
  punchoutRequisition: 'punchout/sessions/${sId}/requisition',
};

export const defaultOccPunchoutConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...punchoutOccEndpoints,
      },
    },
  },
};
