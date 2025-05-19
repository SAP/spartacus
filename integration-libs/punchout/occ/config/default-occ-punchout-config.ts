/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';
import { PUNCHOUT_OCC_API_URL_SEGMENT } from '@spartacus/punchout/root';
import { PunchoutOccEndpoints } from '../model/occ-punchout.model';

const punchoutOccEndpoints: PunchoutOccEndpoints = {
  punchoutSession: PUNCHOUT_OCC_API_URL_SEGMENT + '/${sessionId}',
  punchoutSessionRequisition:
    PUNCHOUT_OCC_API_URL_SEGMENT + '/${sessionId}/requisition',
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
