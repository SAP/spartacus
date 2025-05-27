/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PunchoutNavigationGuardConfig } from './punchout-guard-config';
import { PunchOutOperation } from '../model';

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
        allowedCxRoutes: [
          'punchoutSession',
          'punchoutRequisition',
          'punchoutInspect',
        ],
        redirectPage: { cxRoute: 'punchoutInspect' },
      },
      [PunchOutOperation.EDIT]: {
        allowedUrls: ['/'],
        allowedCxRoutes: [
          ...allowedCxRoutesForEditCreate,
          'punchoutSession',
          'punchoutRequisition',
        ],
        redirectPage: { cxRoute: 'home' },
      },
      [PunchOutOperation.CREATE]: {
        allowedUrls: ['/'],
        allowedCxRoutes: [
          ...allowedCxRoutesForEditCreate,
          'punchoutSession',
          'punchoutRequisition',
        ],
        redirectPage: { cxRoute: 'home' },
      },
    },
  };
