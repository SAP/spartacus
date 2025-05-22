/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultPunchoutRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      punchoutError: {
        paths: ['punchout/cxml/error'],
        protected: false,
        authFlow: true,
      },
    },
  },
};
