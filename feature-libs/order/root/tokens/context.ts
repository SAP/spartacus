/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

export const OrderDetailsOrderEntriesContextToken = new InjectionToken(
  'OrderDetailsOrderEntriesContext'
);

export const OrderConfirmationOrderEntriesContextToken = new InjectionToken(
  'OrderConfirmationOrderEntriesContext'
);

export const USE_MY_ACCOUNT_V2_ORDER = new InjectionToken<boolean>(
  'feature flag to enable enhanced UI for Order related pages under My-Account',
  { providedIn: 'root', factory: () => false }
);
