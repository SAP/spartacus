/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

export const USE_MY_ACCOUNT_V2_EMAIL = new InjectionToken<boolean>(
  'feature flag to enable enhanced UI for email related pages under My-Account',
  { providedIn: 'root', factory: () => false }
);
