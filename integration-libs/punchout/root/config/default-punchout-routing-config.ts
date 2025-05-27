/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';
import {
  PUNCHOUT_ERROR_URL,
  PUNCHOUT_INSPECT_URL,
  PUNCHOUT_REQUISITION_URL,
} from './punchout-constant';

export const defaultPunchoutRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      punchoutSession: {
        paths: [PUNCHOUT_REQUISITION_URL],
        protected: false,
        authFlow: true,
      },
      punchoutRequisition: {
        paths: [PUNCHOUT_REQUISITION_URL],
      },
      punchoutInspect: {
        paths: [PUNCHOUT_INSPECT_URL],
      },
      punchoutError: {
        paths: [PUNCHOUT_ERROR_URL],
        protected: false,
        authFlow: true,
      },
    },
  },
};
