/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LAUNCH_CALLER } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    ACCOUNT_VERIFICATION_TOKEN = 'ACCOUNT_VERIFICATION_TOKEN',
  }
}

(LAUNCH_CALLER as any)['ACCOUNT_VERIFICATION_TOKEN'] =
  'ACCOUNT_VERIFICATION_TOKEN';
