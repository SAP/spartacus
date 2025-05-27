/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PunchoutNavigationGuardConfig } from './punchout-guard-config';
import { PunchOutOperation } from '../model';
import {
  PUNCHOUT_ERROR_URL,
  PUNCHOUT_INSPECT_URL,
  PUNCHOUT_REQUISITION_URL,
  PUNCHOUT_SESSION_URL,
} from './punchout-constant';

const allowedUrlsForAll = [PUNCHOUT_SESSION_URL, PUNCHOUT_REQUISITION_URL];

const allowedUrlsForInspect = [PUNCHOUT_INSPECT_URL];

const allowedCxRoutesForEditCreate: string[] = [
  'category',
  'brand',
  'quickOrder',
  'product',
  'cart',
  'search',
];

export const defaultPunchoutNavigationGuardConfig: PunchoutNavigationGuardConfig =
  {
    punchoutNavigation: {
      [PunchOutOperation.INSPECT]: {
        allowedUrls: [...allowedUrlsForAll, ...allowedUrlsForInspect],
        redirectPage: { cxRoute: 'punchoutInspect' },
      },
      [PunchOutOperation.EDIT]: {
        allowedUrls: [...allowedUrlsForAll, '/', PUNCHOUT_ERROR_URL],
        allowedCxRoutes: [...allowedCxRoutesForEditCreate],
        redirectPage: { cxRoute: 'home' },
      },
      [PunchOutOperation.CREATE]: {
        allowedUrls: [...allowedUrlsForAll, '/', PUNCHOUT_ERROR_URL],
        allowedCxRoutes: [...allowedCxRoutesForEditCreate],
        redirectPage: { cxRoute: 'home' },
      },
    },
  };
