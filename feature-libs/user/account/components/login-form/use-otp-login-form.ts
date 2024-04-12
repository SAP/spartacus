/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

export const USE_ONE_TIME_PASSWORD_LOGIN = new InjectionToken<boolean>(
  'feature flag to enable enhanced UI related pages login',
  { providedIn: 'root', factory: () => false }
);

export const ONE_TIME_PASSWORD_LOGIN_PURPOSE = 'LOGIN';
