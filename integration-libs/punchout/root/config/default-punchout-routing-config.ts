/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';
import {
  PUNCHOUT_ERROR_PAGE_URL,
  PUNCHOUT_SESSION_PAGE_URL,
} from '../model/punchout.model';

export const defaultPunchoutRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      punchoutSession: {
        paths: [PUNCHOUT_SESSION_PAGE_URL],
        protected: false,
        authFlow: true,
      },
      punchoutError: {
        paths: [PUNCHOUT_ERROR_PAGE_URL],
        protected: false,
        authFlow: true,
      },
    },
  },
};
