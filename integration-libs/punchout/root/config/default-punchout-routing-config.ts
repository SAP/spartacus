/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultPunchoutRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      punchoutSession: {
        paths: ['punchout/cxml/session'],
        protected: false,
        authFlow: true,
      },
      punchoutRequisition: {
        paths: ['punchout/cxml/requisition'],
      },
      punchoutInspect: {
        paths: ['punchout/cxml/inspect'],
      },
      punchoutError: {
        paths: ['punchout/cxml/error'],
        protected: false,
        authFlow: true,
      },
    },
  },
};
