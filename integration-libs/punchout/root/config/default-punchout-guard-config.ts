/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PunchoutNavigationGuardConfig } from './punchout-guard-config';
import { PunchOutOperation } from '../model';

const allowedUrlsForAll = [
  'punchout/cxml/session',
  'punchout/cxml/requisition',
];

const allowedUrlsForInspect = ['punchout/cxml/inspect'];

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
        allowedUrls: [...allowedUrlsForAll, ...allowedUrlsForInspect],
        redirectPage: { cxRoute: 'punchoutInspect' },
      },
      [PunchOutOperation.EDIT]: {
        allowedUrls: [...allowedUrlsForAll, '/'],
        allowedCxRoutes: [...allowedCxRoutesForEditCreate],
        redirectPage: { cxRoute: 'home' },
      },
      [PunchOutOperation.CREATE]: {
        allowedUrls: [...allowedUrlsForAll, '/'],
        allowedCxRoutes: [...allowedCxRoutesForEditCreate],
        redirectPage: { cxRoute: 'home' },
      },
    },
  };
