/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

export const USE_MY_ACCOUNT_V2_NOTIFICATION_PREFERENCE =
  new InjectionToken<boolean>(
    'feature flag to enable enhanced UI for notification preference pages under My-Account',
    { providedIn: 'root', factory: () => false }
  );

export const USE_MY_ACCOUNT_V2_CONSENT = new InjectionToken<boolean>(
  'feature flag to enable enhanced UI for Consent Management pages under My-Account',
  { providedIn: 'root', factory: () => false }
);
