/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { LaunchRoute } from '@spartacus/storefront';
import { PunchOutOperation } from '../model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class PunchoutNavigationGuardConfig {
  punchoutNavigation?: {
    [PunchOutOperation.EDIT]: {
      allowedUrls?: string[];
      allowedCxRoutes?: string[];
      redirectPage: string | LaunchRoute;
    };
    [PunchOutOperation.CREATE]: {
      allowedUrls?: string[];
      allowedCxRoutes?: string[];
      redirectPage: string | LaunchRoute;
    };
    [PunchOutOperation.INSPECT]: {
      allowedUrls?: string[];
      allowedCxRoutes?: string[];
      redirectPage: string | LaunchRoute;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends PunchoutNavigationGuardConfig {}
}
