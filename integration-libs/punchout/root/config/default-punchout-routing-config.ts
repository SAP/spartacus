/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultPunchoutRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      punchoutSession: {
        paths: ['punchout/session'],
        protected: false,
        authFlow: true,
      },
      punchoutRequisition: {
        paths: ['punchout/requisition'],
      },
      punchoutInspect: {
        paths: ['punchout/inspect'],
      },
      punchoutError: {
        paths: ['punchout/error'],
        protected: false,
        authFlow: true,
      },
    },
  },
};
