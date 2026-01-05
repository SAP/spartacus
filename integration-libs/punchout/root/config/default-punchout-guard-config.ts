/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PunchoutNavigationGuardConfig } from './punchout-guard-config';
import { PunchOutOperation } from '../model';

const allowedCxRoutesForAll = ['punchoutSession', 'punchoutRequisition'];

const allowedCxRoutesForEditCreate: string[] = [
  'category',
  'brand',
  'quickOrder',
  'product',
  'cart',
  'search',
  'punchoutError',
];

export const defaultPunchoutNavigationGuardConfig: PunchoutNavigationGuardConfig =
  {
    punchoutNavigation: {
      [PunchOutOperation.INSPECT]: {
        allowedCxRoutes: [...allowedCxRoutesForAll, 'punchoutInspect'],
        redirectPage: { cxRoute: 'punchoutInspect' },
      },
      [PunchOutOperation.EDIT]: {
        allowedUrls: ['/'],
        allowedCxRoutes: [
          ...allowedCxRoutesForAll,
          ...allowedCxRoutesForEditCreate,
        ],
        redirectPage: { cxRoute: 'home' },
      },
      [PunchOutOperation.CREATE]: {
        allowedUrls: ['/'],
        allowedCxRoutes: [
          ...allowedCxRoutesForAll,
          ...allowedCxRoutesForEditCreate,
        ],
        redirectPage: { cxRoute: 'home' },
      },
    },
  };
