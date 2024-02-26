/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, inject } from '@angular/core';
import { FeatureFlags } from '@spartacus/core';

export const USE_MY_ACCOUNT_V2_PROFILE = new InjectionToken<boolean>(
  'feature flag to enable enhanced UI for profile related pages under My-Account',
  {
    providedIn: 'root',
    factory: () => Boolean(inject(FeatureFlags).myAccountV2),
  }
);
