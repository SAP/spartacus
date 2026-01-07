/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LAUNCH_CALLER } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    DP_SHOW_CONFIRMATION_DIALOG = 'DP_SHOW_CONFIRMATION_DIALOG',
  }
}
(LAUNCH_CALLER as any)['DP_SHOW_CONFIRMATION_DIALOG'] =
  'DP_SHOW_CONFIRMATION_DIALOG';
