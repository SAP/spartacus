/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LAUNCH_CALLER } from '@spartacus/storefront';


declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    SUBSCRIPTION_CHARGES = 'SUBSCRIPTION_CHARGES',
  }
}

(LAUNCH_CALLER as any)['SUBSCRIPTION_CHARGES'] = 'SUBSCRIPTION_CHARGES';
